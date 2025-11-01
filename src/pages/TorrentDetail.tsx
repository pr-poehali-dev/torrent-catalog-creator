import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import Sidebar from '@/components/Sidebar';
import TorrentCard from '@/components/TorrentCard';

export default function TorrentDetail() {
  const [comment, setComment] = useState('');

  const torrent = {
    title: 'Cyberpunk 2077',
    version: '2.1',
    releaseDate: '2020-12-10',
    developer: 'CD Projekt Red',
    genre: 'RPG, Экшен',
    rating: 9.2,
    image: 'https://cdn.poehali.dev/projects/df1654b5-c500-4f7e-bbaa-37a55935a48c/files/534fc2b3-9bc5-49e8-b753-c5e0b75ade0f.jpg',
    lastUpdate: '2024-10-28',
    description: 'Cyberpunk 2077 — это приключенческая ролевая игра, действие которой происходит в Найт-Сити, мегаполисе будущего, жители которого одержимы властью, роскошью и модификациями тела.',
    size: '70 ГБ',
    languages: 'Русский, Английский',
    voice: 'Русский, Английский',
    tags: ['Открытый мир', 'Киберпанк', 'Будущее', 'Шутер', 'RPG'],
  };

  const screenshots = [
    torrent.image,
    'https://cdn.poehali.dev/projects/df1654b5-c500-4f7e-bbaa-37a55935a48c/files/678e6d8d-347e-4abb-a0f3-a4657466a7a1.jpg',
    'https://cdn.poehali.dev/projects/df1654b5-c500-4f7e-bbaa-37a55935a48c/files/034fe0bc-9a77-41a9-95fe-6c76df534f19.jpg',
  ];

  const similarGames = [
    { id: '1', title: 'The Witcher 3', image: 'https://cdn.poehali.dev/projects/df1654b5-c500-4f7e-bbaa-37a55935a48c/files/678e6d8d-347e-4abb-a0f3-a4657466a7a1.jpg', rating: 9.8 },
    { id: '2', title: 'GTA V', image: 'https://cdn.poehali.dev/projects/df1654b5-c500-4f7e-bbaa-37a55935a48c/files/034fe0bc-9a77-41a9-95fe-6c76df534f19.jpg', rating: 9.5 },
    { id: '3', title: 'Watch Dogs', image: torrent.image, rating: 8.5 },
  ];

  const comments = [
    { id: '1', username: 'Игрок123', avatar: '', date: '2024-10-28', text: 'Отличная игра! Все работает!' },
    { id: '2', username: 'ProGamer', avatar: '', date: '2024-10-27', text: 'Спасибо за раздачу, скачал быстро' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <div className="space-y-8">
            <div className="grid md:grid-cols-[300px_1fr] gap-6">
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden">
                <img
                  src={torrent.image}
                  alt={torrent.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur">
                  <Icon name="Star" size={14} className="mr-1" />
                  {torrent.rating}
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{torrent.title}</h1>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <span>Версия {torrent.version}</span>
                    <span>•</span>
                    <span>{torrent.releaseDate}</span>
                    <span>•</span>
                    <span>{torrent.developer}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {torrent.genre.split(', ').map((g) => (
                    <Badge key={g} variant="outline">{g}</Badge>
                  ))}
                </div>

                <Card className="bg-accent/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Icon name="RefreshCw" className="text-primary mt-1" size={18} />
                      <div className="flex-1">
                        <p className="text-sm">Обновлено {torrent.lastUpdate}</p>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="link" className="h-auto p-0 text-xs">
                              Подробности обновления
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Подробности обновления</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-2 text-sm">
                              <p><strong>Дата:</strong> {torrent.lastUpdate}</p>
                              <p><strong>Версия:</strong> {torrent.version}</p>
                              <p><strong>Список изменений:</strong></p>
                              <ul className="list-disc list-inside text-muted-foreground">
                                <li>Исправлены критические баги</li>
                                <li>Улучшена производительность</li>
                                <li>Добавлен новый контент</li>
                              </ul>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
                  <Icon name="Users" size={14} className="mr-1" />
                  Есть версия для игры по сети на пиратке
                </Badge>

                <Button size="lg" className="w-full md:w-auto">
                  <Icon name="Download" size={18} className="mr-2" />
                  Скачать торрент
                </Button>
                <p className="text-sm text-muted-foreground">Размер: {torrent.size}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-bold mb-4">Описание</h2>
              <p className="text-muted-foreground leading-relaxed">{torrent.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Скриншоты</h2>
              <div className="grid grid-cols-3 gap-4">
                {screenshots.map((screenshot, index) => (
                  <img
                    key={index}
                    src={screenshot}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full aspect-video object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
                  />
                ))}
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Инструкция по установке</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Скачайте торрент-файл</li>
                  <li>Откройте файл в uTorrent или любом другом торрент-клиенте</li>
                  <li>Дождитесь завершения загрузки</li>
                  <li>Запустите установщик из скачанной папки</li>
                  <li>Следуйте инструкциям установщика</li>
                </ol>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Информация</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Дата выхода:</span>
                      <span>{torrent.releaseDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Жанр:</span>
                      <span>{torrent.genre}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Разработчик:</span>
                      <span>{torrent.developer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Интерфейс:</span>
                      <span>{torrent.languages}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Озвучка:</span>
                      <span>{torrent.voice}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Системные требования</h3>
                  <Tabs defaultValue="min">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="min">Минимальные</TabsTrigger>
                      <TabsTrigger value="rec">Рекомендуемые</TabsTrigger>
                    </TabsList>
                    <TabsContent value="min" className="text-sm space-y-1 mt-3">
                      <p><strong>ОС:</strong> Windows 10</p>
                      <p><strong>Процессор:</strong> Intel Core i5-3570K</p>
                      <p><strong>Память:</strong> 8 GB RAM</p>
                      <p><strong>Видеокарта:</strong> GTX 780</p>
                    </TabsContent>
                    <TabsContent value="rec" className="text-sm space-y-1 mt-3">
                      <p><strong>ОС:</strong> Windows 10</p>
                      <p><strong>Процессор:</strong> Intel Core i7-4790</p>
                      <p><strong>Память:</strong> 16 GB RAM</p>
                      <p><strong>Видеокарта:</strong> GTX 1060</p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Теги</h3>
              <div className="flex flex-wrap gap-2">
                {torrent.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>

            <Card className="bg-green-500/5 border-green-500/20">
              <CardContent className="p-6 flex items-center gap-3">
                <Icon name="Gamepad2" className="text-green-600" size={24} />
                <div>
                  <h3 className="font-semibold">Steam Deck</h3>
                  <p className="text-sm text-muted-foreground">Игра поддерживается на Steam Deck</p>
                </div>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-2xl font-bold mb-4">Похожие игры</h2>
              <div className="grid grid-cols-3 gap-4">
                {similarGames.map((game) => (
                  <TorrentCard key={game.id} {...game} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Комментарии</h2>
              <Card className="mb-4">
                <CardContent className="p-4">
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Написать комментарий..."
                    className="mb-3"
                  />
                  <Button>Отправить</Button>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {comments.map((c) => (
                  <Card key={c.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarImage src={c.avatar} />
                          <AvatarFallback>{c.username[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">{c.username}</span>
                            <span className="text-xs text-muted-foreground">{c.date}</span>
                          </div>
                          <p className="text-sm">{c.text}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Как скачивать торренты через uTorrent</h2>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Скачайте и установите программу uTorrent с официального сайта</li>
                  <li>Нажмите кнопку "Скачать торрент" на этой странице</li>
                  <li>Откройте скачанный .torrent файл в uTorrent</li>
                  <li>Выберите папку для сохранения файлов</li>
                  <li>Дождитесь завершения загрузки</li>
                </ol>
              </CardContent>
            </Card>
          </div>

          <aside className="lg:sticky lg:top-24 h-fit">
            <Sidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}
