import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { torrentsApi, type Torrent } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Admin() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTorrent, setEditingTorrent] = useState<Torrent | null>(null);
  const queryClient = useQueryClient();

  const { data: torrents = [], isLoading } = useQuery({
    queryKey: ['admin-torrents'],
    queryFn: () => torrentsApi.getAll(100),
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<Torrent>) => torrentsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-torrents'] });
      queryClient.invalidateQueries({ queryKey: ['torrents'] });
      setIsDialogOpen(false);
      toast.success('Торрент успешно создан!');
    },
    onError: () => {
      toast.error('Ошибка при создании торрента');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Torrent> }) =>
      torrentsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-torrents'] });
      queryClient.invalidateQueries({ queryKey: ['torrents'] });
      setIsDialogOpen(false);
      setEditingTorrent(null);
      toast.success('Торрент успешно обновлен!');
    },
    onError: () => {
      toast.error('Ошибка при обновлении торрента');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data: Partial<Torrent> = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      image_url: formData.get('image_url') as string,
      release_date: formData.get('release_date') as string,
      rating: parseFloat(formData.get('rating') as string),
      version: formData.get('version') as string,
      size: formData.get('size') as string,
      category: formData.get('category') as string,
      language: formData.get('language') as string,
      platform: formData.get('platform') as string,
    };

    if (editingTorrent) {
      updateMutation.mutate({ id: editingTorrent.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (torrent: Torrent) => {
    setEditingTorrent(torrent);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingTorrent(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Админ-панель</h1>
            <p className="text-muted-foreground">Управление каталогом торрентов</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingTorrent(null)}>
                <Icon name="Plus" size={20} className="mr-2" />
                Добавить торрент
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingTorrent ? 'Редактировать торрент' : 'Добавить торрент'}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Название *</Label>
                  <Input
                    id="title"
                    name="title"
                    required
                    defaultValue={editingTorrent?.title}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    defaultValue={editingTorrent?.description}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="image_url">URL изображения</Label>
                    <Input
                      id="image_url"
                      name="image_url"
                      type="url"
                      defaultValue={editingTorrent?.image_url}
                    />
                  </div>

                  <div>
                    <Label htmlFor="release_date">Дата выхода</Label>
                    <Input
                      id="release_date"
                      name="release_date"
                      type="date"
                      defaultValue={editingTorrent?.release_date}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rating">Рейтинг (0-10)</Label>
                    <Input
                      id="rating"
                      name="rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      defaultValue={editingTorrent?.rating}
                    />
                  </div>

                  <div>
                    <Label htmlFor="version">Версия</Label>
                    <Input
                      id="version"
                      name="version"
                      defaultValue={editingTorrent?.version}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="size">Размер</Label>
                    <Input
                      id="size"
                      name="size"
                      placeholder="12.5 GB"
                      defaultValue={editingTorrent?.size}
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Категория</Label>
                    <Input
                      id="category"
                      name="category"
                      placeholder="pc, console"
                      defaultValue={editingTorrent?.category}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="language">Язык</Label>
                    <Input
                      id="language"
                      name="language"
                      defaultValue={editingTorrent?.language}
                    />
                  </div>

                  <div>
                    <Label htmlFor="platform">Платформа</Label>
                    <Input
                      id="platform"
                      name="platform"
                      placeholder="Windows, macOS, Linux"
                      defaultValue={editingTorrent?.platform}
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-4">
                  <Button type="button" variant="outline" onClick={handleCloseDialog}>
                    Отмена
                  </Button>
                  <Button type="submit">
                    {editingTorrent ? 'Сохранить' : 'Создать'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Загрузка...</p>
          </div>
        ) : (
          <div className="bg-card border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Название</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Рейтинг</TableHead>
                  <TableHead>Версия</TableHead>
                  <TableHead>Дата создания</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {torrents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Нет торрентов. Добавьте первый!
                    </TableCell>
                  </TableRow>
                ) : (
                  torrents.map((torrent) => (
                    <TableRow key={torrent.id}>
                      <TableCell>{torrent.id}</TableCell>
                      <TableCell className="font-medium">{torrent.title}</TableCell>
                      <TableCell>{torrent.category || '-'}</TableCell>
                      <TableCell>{torrent.rating || '-'}</TableCell>
                      <TableCell>{torrent.version || '-'}</TableCell>
                      <TableCell>
                        {torrent.created_at 
                          ? new Date(torrent.created_at).toLocaleDateString('ru-RU')
                          : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(torrent)}
                        >
                          <Icon name="Pencil" size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
