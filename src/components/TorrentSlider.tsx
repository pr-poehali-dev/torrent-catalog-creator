import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import TorrentCard from './TorrentCard';

interface Torrent {
  id: string;
  title: string;
  image: string;
  date?: string;
  downloads?: number;
  rating?: number;
}

interface TorrentSliderProps {
  title: string;
  torrents: Torrent[];
  onTorrentClick: (id: string) => void;
}

export default function TorrentSlider({ title, torrents, onTorrentClick }: TorrentSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 5;

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < torrents.length - itemsPerView;

  const handlePrev = () => {
    if (canGoBack) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (canGoForward) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            disabled={!canGoBack}
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={!canGoForward}
          >
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="grid grid-cols-5 gap-4 transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {torrents.map((torrent) => (
            <TorrentCard
              key={torrent.id}
              {...torrent}
              onClick={() => onTorrentClick(torrent.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
