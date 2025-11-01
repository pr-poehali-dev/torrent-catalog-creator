const API_BASE_URL = 'https://functions.poehali.dev/4e091522-aa90-4160-8029-4029ccae7681';

export interface Torrent {
  id: number;
  title: string;
  description?: string;
  image_url?: string;
  release_date?: string;
  rating?: number;
  downloads?: number;
  version?: string;
  size?: string;
  category?: string;
  language?: string;
  platform?: string;
  genres?: string[];
  screenshots?: Screenshot[];
  requirements?: {
    minimum?: SystemRequirement;
    recommended?: SystemRequirement;
  };
  comments?: Comment[];
  created_at?: string;
  updated_at?: string;
}

export interface Screenshot {
  id: number;
  torrent_id: number;
  image_url: string;
  sort_order: number;
}

export interface SystemRequirement {
  id: number;
  torrent_id: number;
  requirement_type: 'minimum' | 'recommended';
  os?: string;
  processor?: string;
  ram?: string;
  video_card?: string;
  disk_space?: string;
}

export interface Comment {
  id: number;
  torrent_id: number;
  author: string;
  content: string;
  rating?: number;
  created_at: string;
}

export const torrentsApi = {
  async getAll(limit = 20): Promise<Torrent[]> {
    const response = await fetch(`${API_BASE_URL}?limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch torrents');
    return response.json();
  },

  async getById(id: number): Promise<Torrent> {
    const response = await fetch(`${API_BASE_URL}?id=${id}`);
    if (!response.ok) throw new Error('Failed to fetch torrent');
    return response.json();
  },

  async getByCategory(category: string, limit = 20): Promise<Torrent[]> {
    const response = await fetch(`${API_BASE_URL}?category=${category}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch torrents');
    return response.json();
  },

  async search(query: string, limit = 20): Promise<Torrent[]> {
    const response = await fetch(`${API_BASE_URL}?search=${encodeURIComponent(query)}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to search torrents');
    return response.json();
  },

  async create(data: Partial<Torrent>): Promise<Torrent> {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create torrent');
    return response.json();
  },

  async update(id: number, data: Partial<Torrent>): Promise<Torrent> {
    const response = await fetch(`${API_BASE_URL}?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update torrent');
    return response.json();
  },
};
