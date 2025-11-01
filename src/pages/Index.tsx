import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import FilterButtons from '@/components/FilterButtons';
import TorrentSlider from '@/components/TorrentSlider';
import Sidebar from '@/components/Sidebar';

export default function Index() {
  const [activeFilter, setActiveFilter] = useState('new');
  const navigate = useNavigate();

  const newReleases = [
    { id: '1', title: 'Cyberpunk 2077', image: 'https://cdn.poehali.dev/projects/df1654b5-c500-4f7e-bbaa-37a55935a48c/files/534fc2b3-9bc5-49e8-b753-c5e0b75ade0f.jpg', date: '2024-10-28', rating: 9.2 },
    { id: '2', title: 'The Witcher 3', image: 'https://cdn.poehali.dev/projects/df1654b5-c500-4f7e-bbaa-37a55935a48c/files/678e6d8d-347e-4abb-a0f3-a4657466a7a1.jpg', date: '2024-10-25', rating: 9.8 },
    { id: '3', title: 'GTA V', image: 'https://cdn.poehali.dev/projects/df1654b5-c500-4f7e-bbaa-37a55935a48c/files/034fe0bc-9a77-41a9-95fe-6c76df534f19.jpg', date: '2024-10-20', rating: 9.5 },
    { id: '4', title: 'Red Dead Redemption 2', image: 'https://cdn.poehali.dev/projects/df1654b5-c500-4f7e-bbaa-37a55935a48c/files/534fc2b3-9bc5-49e8-b753-c5e0b75ade0f.jpg', date: '2024-10-15', rating: 9.7 },
    { id: '5', title: 'God of War', image: 'https://cdn.poehali.dev/projects/df1654b5-c500-4f7e-bbaa-37a55935a48c/files/678e6d8d-347e-4abb-a0f3-a4657466a7a1.jpg', date: '2024-10-10', rating: 9.6 },
    { id: '6', title: 'Horizon Zero Dawn', image: 'https://cdn.poehali.dev/projects/df1654b5-c500-4f7e-bbaa-37a55935a48c/files/034fe0bc-9a77-41a9-95fe-6c76df534f19.jpg', date: '2024-10-05', rating: 9.1 },
  ];

  const pcGames = [
    { id: '7', title: 'Counter-Strike 2', image: 'https://cdn.poehali.dev/projects/df1654b5-c500-4f7e-bbaa-37a55935a48c/files/534fc2b3-9bc5-49e8-b753-c5e0b75ade0f.jpg', downloads: 15420, rating: 9.3 },
    { id: '8', title: 'Dota 2', image: 'https://cdn.poehali.dev/projects/df1654b5-c500-4f7e-bbaa-37a55935a48c/files/678e6d8d-347e-4abb-a0f3-a4657466a7a1.jpg', downloads: 12830, rating: 9.0 },
    { id: '9', title: 'Valorant', image: 'https://cdn.poehali.dev/projects/df1654b5-c500-4f7e-bbaa-37a55935a48c/files/034fe0bc-9a77-41a9-95fe-6c76df534f19.jpg', downloads: 11250, rating: 8.8 },
    { id: '10', title: 'Apex Legends', image: 'https://cdn.poehali.dev/projects/df1654b5-c500-4f7e-bbaa-37a55935a48c/files/534fc2b3-9bc5-49e8-b753-c5e0b75ade0f.jpg', downloads: 9870, rating: 8.9 },
    { id: '11', title: 'League of Legends', image: 'https://cdn.poehali.dev/projects/df1654b5-c500-4f7e-bbaa-37a55935a48c/files/678e6d8d-347e-4abb-a0f3-a4657466a7a1.jpg', downloads: 8650, rating: 8.7 },
    { id: '12', title: 'Overwatch 2', image: 'https://cdn.poehali.dev/projects/df1654b5-c500-4f7e-bbaa-37a55935a48c/files/034fe0bc-9a77-41a9-95fe-6c76df534f19.jpg', downloads: 7890, rating: 8.5 },
  ];

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
    </div>
  );
}
