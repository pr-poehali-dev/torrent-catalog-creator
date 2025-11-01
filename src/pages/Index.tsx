import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import FilterButtons from '@/components/FilterButtons';
import TorrentSlider from '@/components/TorrentSlider';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { torrentsApi, type Torrent } from '@/lib/api';

export default function Index() {
  const [activeFilter, setActiveFilter] = useState('new');
  const navigate = useNavigate();

  const { data: allTorrents = [], isLoading } = useQuery({
    queryKey: ['torrents'],
    queryFn: () => torrentsApi.getAll(50),
  });

  const newReleases = allTorrents
    .sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime())
    .slice(0, 6)
    .map(t => ({
      id: String(t.id),
      title: t.title,
      image: t.image_url || '',
      date: t.release_date || '',
      rating: t.rating || 0
    }));

  const pcGames = allTorrents
    .filter(t => t.category === 'pc')
    .slice(0, 6)
    .map(t => ({
      id: String(t.id),
      title: t.title,
      image: t.image_url || '',
      downloads: t.downloads || 0,
      rating: t.rating || 0
    }));

  const handleTorrentClick = (id: string) => {
    navigate('/torrent/' + id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <FilterButtons activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <main className="space-y-12">
            <TorrentSlider
              title="Вышедшие новинки"
              torrents={newReleases}
              onTorrentClick={handleTorrentClick}
            />

            <TorrentSlider
              title="Игры на ПК"
              torrents={pcGames}
              onTorrentClick={handleTorrentClick}
            />
          </main>

          <aside className="lg:sticky lg:top-24 h-fit">
            <Sidebar />
          </aside>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}