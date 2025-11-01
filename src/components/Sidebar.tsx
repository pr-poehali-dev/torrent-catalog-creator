import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const updates = [
  { id: '1', title: 'Cyberpunk 2077', date: '2024-10-28', image: 'https://cdn.poehali.dev/projects/df1654b5-c500-4f7e-bbaa-37a55935a48c/files/534fc2b3-9bc5-49e8-b753-c5e0b75ade0f.jpg' },
  { id: '2', title: 'The Witcher 3', date: '2024-10-27', image: 'https://cdn.poehali.dev/projects/df1654b5-c500-4f7e-bbaa-37a55935a48c/files/678e6d8d-347e-4abb-a0f3-a4657466a7a1.jpg' },
];

const genres = ['Экшен', 'RPG', 'Стратегия', 'Симулятор', 'Гонки', 'Приключения', 'Хоррор', 'Спорт'];

const popular = [
  { id: '1', title: 'GTA V', size: '94 ГБ', year: '2024', rating: 9.5, image: 'https://cdn.poehali.dev/projects/df1654b5-c500-4f7e-bbaa-37a55935a48c/files/534fc2b3-9bc5-49e8-b753-c5e0b75ade0f.jpg' },
  { id: '2', title: 'Red Dead 2', size: '150 ГБ', year: '2024', rating: 9.8, image: 'https://cdn.poehali.dev/projects/df1654b5-c500-4f7e-bbaa-37a55935a48c/files/678e6d8d-347e-4abb-a0f3-a4657466a7a1.jpg' },
];

const comments = [
  { id: '1', username: 'Игрок123', avatar: '', date: '2ч назад', torrent: 'Cyberpunk 2077' },
  { id: '2', username: 'ProGamer', avatar: '', date: '5ч назад', torrent: 'GTA V' },
];

export default function Sidebar() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Последние обновления</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {updates.map((update) => (
            <div key={update.id} className="flex gap-3 group cursor-pointer">
              <img
                src={update.image}
                alt={update.title}
                className="w-16 h-20 object-cover rounded group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-2">{update.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  <Icon name="Calendar" size={10} className="inline mr-1" />
                  {update.date}
                </p>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full mt-2" size="sm">
            Посмотреть все обновления
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Навигация по жанрам</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Badge
                key={genre}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {genre}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Популярные торренты</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {popular.map((item) => (
            <div key={item.id} className="flex gap-3 group cursor-pointer">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-20 object-cover rounded group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm">{item.title}</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <span>{item.size}</span>
                  <span>•</span>
                  <span>{item.year}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Icon name="Star" size={12} className="text-yellow-500" />
                  <span className="text-xs font-medium">{item.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Последние комментарии</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 cursor-pointer hover:bg-accent/50 -mx-3 px-3 py-2 rounded transition-colors">
              <Avatar className="w-8 h-8">
                <AvatarImage src={comment.avatar} />
                <AvatarFallback className="text-xs">{comment.username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{comment.username}</span>
                  <span className="text-xs text-muted-foreground">{comment.date}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">под {comment.torrent}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
