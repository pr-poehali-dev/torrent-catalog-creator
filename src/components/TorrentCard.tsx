import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface TorrentCardProps {
  id: string;
  title: string;
  image: string;
  date?: string;
  downloads?: number;
  rating?: number;
  onClick?: () => void;
}

export default function TorrentCard({ title, image, date, downloads, rating, onClick }: TorrentCardProps) {
  return (
    <Card 
      className="overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {rating && (
          <Badge className="absolute top-2 right-2 bg-primary/90 backdrop-blur">
            <Icon name="Star" size={12} className="mr-1" />
            {rating}
          </Badge>
        )}
      </div>
      <CardContent className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2 mb-2">{title}</h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {date && (
            <div className="flex items-center gap-1">
              <Icon name="Calendar" size={12} />
              {date}
            </div>
          )}
          {downloads && (
            <div className="flex items-center gap-1">
              <Icon name="Download" size={12} />
              {downloads}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
