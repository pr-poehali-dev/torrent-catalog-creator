'''
Business: API для работы с каталогом торрентов - получение списков, деталей, поиск
Args: event с httpMethod, queryStringParameters, body; context с request_id
Returns: JSON с торрентами или детальной информацией
'''

import json
import os
from typing import Dict, Any, List, Optional
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            torrent_id = params.get('id')
            category = params.get('category')
            search = params.get('search')
            limit = int(params.get('limit', '20'))
            
            if torrent_id:
                result = get_torrent_detail(conn, int(torrent_id))
            elif search:
                result = search_torrents(conn, search, limit)
            elif category:
                result = get_torrents_by_category(conn, category, limit)
            else:
                result = get_all_torrents(conn, limit)
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            result = create_torrent(conn, body)
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            params = event.get('queryStringParameters') or {}
            torrent_id = params.get('id')
            body = json.loads(event.get('body', '{}'))
            
            if not torrent_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'ID required'}),
                    'isBase64Encoded': False
                }
            
            result = update_torrent(conn, int(torrent_id), body)
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result, default=str),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        conn.close()

def get_all_torrents(conn, limit: int) -> List[Dict]:
    with conn.cursor() as cur:
        cur.execute('''
            SELECT t.*, 
                   ARRAY_AGG(g.name) FILTER (WHERE g.name IS NOT NULL) as genres
            FROM torrents t
            LEFT JOIN torrent_genres tg ON t.id = tg.torrent_id
            LEFT JOIN genres g ON tg.genre_id = g.id
            GROUP BY t.id
            ORDER BY t.created_at DESC
            LIMIT %s
        ''', (limit,))
        return cur.fetchall()

def get_torrents_by_category(conn, category: str, limit: int) -> List[Dict]:
    with conn.cursor() as cur:
        cur.execute('''
            SELECT t.*, 
                   ARRAY_AGG(g.name) FILTER (WHERE g.name IS NOT NULL) as genres
            FROM torrents t
            LEFT JOIN torrent_genres tg ON t.id = tg.torrent_id
            LEFT JOIN genres g ON tg.genre_id = g.id
            WHERE t.category = %s
            GROUP BY t.id
            ORDER BY t.created_at DESC
            LIMIT %s
        ''', (category, limit))
        return cur.fetchall()

def search_torrents(conn, query: str, limit: int) -> List[Dict]:
    with conn.cursor() as cur:
        search_pattern = f'%{query}%'
        cur.execute('''
            SELECT t.*, 
                   ARRAY_AGG(g.name) FILTER (WHERE g.name IS NOT NULL) as genres
            FROM torrents t
            LEFT JOIN torrent_genres tg ON t.id = tg.torrent_id
            LEFT JOIN genres g ON tg.genre_id = g.id
            WHERE t.title ILIKE %s OR t.description ILIKE %s
            GROUP BY t.id
            ORDER BY t.rating DESC
            LIMIT %s
        ''', (search_pattern, search_pattern, limit))
        return cur.fetchall()

def get_torrent_detail(conn, torrent_id: int) -> Dict:
    with conn.cursor() as cur:
        cur.execute('''
            SELECT t.*, 
                   ARRAY_AGG(DISTINCT g.name) FILTER (WHERE g.name IS NOT NULL) as genres
            FROM torrents t
            LEFT JOIN torrent_genres tg ON t.id = tg.torrent_id
            LEFT JOIN genres g ON tg.genre_id = g.id
            WHERE t.id = %s
            GROUP BY t.id
        ''', (torrent_id,))
        torrent = cur.fetchone()
        
        if not torrent:
            return {'error': 'Torrent not found'}
        
        cur.execute('SELECT * FROM screenshots WHERE torrent_id = %s ORDER BY sort_order', (torrent_id,))
        torrent['screenshots'] = cur.fetchall()
        
        cur.execute('SELECT * FROM system_requirements WHERE torrent_id = %s', (torrent_id,))
        requirements = cur.fetchall()
        torrent['requirements'] = {r['requirement_type']: r for r in requirements}
        
        cur.execute('SELECT * FROM comments WHERE torrent_id = %s ORDER BY created_at DESC LIMIT 10', (torrent_id,))
        torrent['comments'] = cur.fetchall()
        
        return torrent

def create_torrent(conn, data: Dict) -> Dict:
    with conn.cursor() as cur:
        cur.execute('''
            INSERT INTO torrents (title, description, image_url, release_date, rating, 
                                 version, size, category, language, platform)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING *
        ''', (
            data['title'], data.get('description'), data.get('image_url'),
            data.get('release_date'), data.get('rating'), data.get('version'),
            data.get('size'), data.get('category'), data.get('language'),
            data.get('platform')
        ))
        torrent = cur.fetchone()
        conn.commit()
        return torrent

def update_torrent(conn, torrent_id: int, data: Dict) -> Dict:
    with conn.cursor() as cur:
        cur.execute('''
            UPDATE torrents 
            SET title = COALESCE(%s, title),
                description = COALESCE(%s, description),
                image_url = COALESCE(%s, image_url),
                rating = COALESCE(%s, rating),
                version = COALESCE(%s, version),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = %s
            RETURNING *
        ''', (
            data.get('title'), data.get('description'), data.get('image_url'),
            data.get('rating'), data.get('version'), torrent_id
        ))
        torrent = cur.fetchone()
        conn.commit()
        return torrent
