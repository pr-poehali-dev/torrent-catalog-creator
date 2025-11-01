import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import TorrentCard from '@/components/TorrentCard';
import { torrentsApi } from '@/lib/api';

export default function TorrentDetail() {
  const { id } = useParams();
  const [comment, setComment] = useState('');

  const { data: torrentData, isLoading } = useQuery({
    queryKey: ['torrent', id],
    queryFn: () => torrentsApi.getById(Number(id)),
    enabled: !!id,
  });

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">Загрузка...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!torrentData || 'error' in torrentData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">Торрент не найден</p>
        </div>
        <Footer />
      </div>
    );
  }

  const screenshots = torrentData.screenshots?.map(s => s.image_url) || [torrentData.image_url || ''];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <div className="space-y-8">
            <div className="grid md:grid-cols-[300px_1fr] gap-6">
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden">
                <img
                  src={torrentData.image_url || ''}
                  alt={torrentData.title}
                  className="w-full h-full object-cover"
                />
                {torrentData.rating && (
                  <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur">
                    <Icon name="Star" size={14} className="mr-1" />
                    {torrentData.rating}
                  </Badge>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{torrentData.title}</h1>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    {torrentData.version && <span>Версия {torrentData.version}</span>}
                    {torrentData.release_date && (
                      <>
                        <span>•</span>
                        <span>{new Date(torrentData.release_date).toLocaleDateString('ru-RU')}</span>
                      </>
                    )}
                  </div>
                </div>

                {torrentData.genres && torrentData.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {torrentData.genres.map((g) => (
                      <Badge key={g} variant="outline">{g}</Badge>
                    ))}
                  </div>
                )}

                {torrentData.updated_at && (
                  <Card className="bg-accent/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Icon name="RefreshCw" className="text-primary mt-1" size={18} />
                        <div className="flex-1">
                          <p className="text-sm">
                            Обновлено {new Date(torrentData.updated_at).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button size="lg" className="w-full md:w-auto">
                  <Icon name="Download" size={18} className="mr-2" />
                  Скачать торрент
                </Button>
                {torrentData.size && (
                  <p className="text-sm text-muted-foreground">Размер: {torrentData.size}</p>
                )}
              </div>
            </div>

            <Separator />

            {torrentData.description && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Описание</h2>
                <p className="text-muted-foreground leading-relaxed">{torrentData.description}</p>
              </div>
            )}

            {screenshots.length > 0 && screenshots[0] && (
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
            )}

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
                    {torrentData.release_date && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Дата выхода:</span>
                        <span>{new Date(torrentData.release_date).toLocaleDateString('ru-RU')}</span>
                      </div>
                    )}
                    {torrentData.category && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Категория:</span>
                        <span>{torrentData.category}</span>
                      </div>
                    )}
                    {torrentData.language && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Язык:</span>
                        <span>{torrentData.language}</span>
                      </div>
                    )}
                    {torrentData.platform && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Платформа:</span>
                        <span>{torrentData.platform}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {torrentData.requirements && (Object.keys(torrentData.requirements).length > 0) && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Системные требования</h3>
                    <Tabs defaultValue={torrentData.requirements.minimum ? "min" : "rec"}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="min" disabled={!torrentData.requirements.minimum}>
                          Минимальные
                        </TabsTrigger>
                        <TabsTrigger value="rec" disabled={!torrentData.requirements.recommended}>
                          Рекомендуемые
                        </TabsTrigger>
                      </TabsList>
                      {torrentData.requirements.minimum && (
                        <TabsContent value="min" className="text-sm space-y-1 mt-3">
                          {torrentData.requirements.minimum.os && <p><strong>ОС:</strong> {torrentData.requirements.minimum.os}</p>}
                          {torrentData.requirements.minimum.processor && <p><strong>Процессор:</strong> {torrentData.requirements.minimum.processor}</p>}
                          {torrentData.requirements.minimum.ram && <p><strong>Память:</strong> {torrentData.requirements.minimum.ram}</p>}
                          {torrentData.requirements.minimum.video_card && <p><strong>Видеокарта:</strong> {torrentData.requirements.minimum.video_card}</p>}
                          {torrentData.requirements.minimum.disk_space && <p><strong>Место на диске:</strong> {torrentData.requirements.minimum.disk_space}</p>}
                        </TabsContent>
                      )}
                      {torrentData.requirements.recommended && (
                        <TabsContent value="rec" className="text-sm space-y-1 mt-3">
                          {torrentData.requirements.recommended.os && <p><strong>ОС:</strong> {torrentData.requirements.recommended.os}</p>}
                          {torrentData.requirements.recommended.processor && <p><strong>Процессор:</strong> {torrentData.requirements.recommended.processor}</p>}
                          {torrentData.requirements.recommended.ram && <p><strong>Память:</strong> {torrentData.requirements.recommended.ram}</p>}
                          {torrentData.requirements.recommended.video_card && <p><strong>Видеокарта:</strong> {torrentData.requirements.recommended.video_card}</p>}
                          {torrentData.requirements.recommended.disk_space && <p><strong>Место на диске:</strong> {torrentData.requirements.recommended.disk_space}</p>}
                        </TabsContent>
                      )}
                    </Tabs>
                  </CardContent>
                </Card>
              )}
            </div>



            {torrentData.comments && torrentData.comments.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Комментарии</h2>
                <div className="space-y-4">
                  {torrentData.comments.map((c) => (
                    <Card key={c.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <Avatar>
                            <AvatarFallback>{c.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-semibold">{c.author}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(c.created_at).toLocaleDateString('ru-RU')}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{c.content}</p>
                            {c.rating && (
                              <div className="mt-2 flex items-center gap-1 text-xs text-primary">
                                <Icon name="Star" size={12} />
                                {c.rating}/10
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

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
      
      <Footer />
    </div>
  );
}