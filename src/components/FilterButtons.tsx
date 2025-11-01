import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const filters = [
  { id: 'new', label: 'Новинки', icon: 'Sparkles' },
  { id: 'updates', label: 'Обновления', icon: 'RefreshCw' },
  { id: 'goty', label: 'Игры года', icon: 'Trophy' },
  { id: 'top250', label: 'Топ 250', icon: 'Star' },
  { id: 'network', label: 'По сети', icon: 'Users' },
  { id: 'years', label: 'По годам', icon: 'Calendar' },
];

interface FilterButtonsProps {
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

export default function FilterButtons({ activeFilter, onFilterChange }: FilterButtonsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? 'default' : 'outline'}
          className="flex items-center gap-2 whitespace-nowrap"
          onClick={() => onFilterChange(filter.id)}
        >
          <Icon name={filter.icon as any} size={16} />
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
