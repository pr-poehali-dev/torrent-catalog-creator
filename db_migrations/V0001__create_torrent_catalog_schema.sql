-- Создание таблицы торрентов
CREATE TABLE torrents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    release_date DATE,
    rating DECIMAL(3,1),
    downloads INTEGER DEFAULT 0,
    version VARCHAR(50),
    size VARCHAR(50),
    category VARCHAR(50),
    language VARCHAR(50),
    platform VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы жанров
CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE
);

-- Связь многие-ко-многим между торрентами и жанрами
CREATE TABLE torrent_genres (
    torrent_id INTEGER REFERENCES torrents(id),
    genre_id INTEGER REFERENCES genres(id),
    PRIMARY KEY (torrent_id, genre_id)
);

-- Создание таблицы системных требований
CREATE TABLE system_requirements (
    id SERIAL PRIMARY KEY,
    torrent_id INTEGER REFERENCES torrents(id),
    requirement_type VARCHAR(20) CHECK (requirement_type IN ('minimum', 'recommended')),
    os VARCHAR(255),
    processor VARCHAR(255),
    ram VARCHAR(100),
    video_card VARCHAR(255),
    disk_space VARCHAR(100),
    UNIQUE(torrent_id, requirement_type)
);

-- Создание таблицы скриншотов
CREATE TABLE screenshots (
    id SERIAL PRIMARY KEY,
    torrent_id INTEGER REFERENCES torrents(id),
    image_url TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

-- Создание таблицы комментариев
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    torrent_id INTEGER REFERENCES torrents(id),
    author VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индексов для оптимизации
CREATE INDEX idx_torrents_category ON torrents(category);
CREATE INDEX idx_torrents_rating ON torrents(rating DESC);
CREATE INDEX idx_torrents_release_date ON torrents(release_date DESC);
CREATE INDEX idx_comments_torrent_id ON comments(torrent_id);
CREATE INDEX idx_screenshots_torrent_id ON screenshots(torrent_id);

-- Вставка начальных жанров
INSERT INTO genres (name, slug) VALUES
    ('Экшен', 'action'),
    ('РПГ', 'rpg'),
    ('Шутер', 'shooter'),
    ('Стратегия', 'strategy'),
    ('Приключения', 'adventure'),
    ('Симулятор', 'simulator'),
    ('Гонки', 'racing'),
    ('Спорт', 'sport'),
    ('Хорror', 'horror'),
    ('Платформер', 'platformer');