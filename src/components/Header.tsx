import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { useTheme } from '@/hooks/useTheme';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            GameTorrents
          </h1>
          
          <div className="flex-1 max-w-2xl relative">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск игр..."
              className="pl-10"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={20} />
          </Button>

          <Avatar className="cursor-pointer hover:ring-2 ring-primary transition-all">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground">ИГ</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
