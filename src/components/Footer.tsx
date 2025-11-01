import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Icon name="Download" size={24} className="text-primary" />
              TorrentHub
            </h3>
            <p className="text-sm text-muted-foreground">
              Каталог игровых торрентов с подробными описаниями, скриншотами и системными требованиями.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-muted-foreground hover:text-foreground transition">
                  Админ-панель
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Категории</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Игры на ПК</li>
              <li className="text-muted-foreground">Новинки</li>
              <li className="text-muted-foreground">Топ 250</li>
              <li className="text-muted-foreground">По жанрам</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Icon name="Mail" size={16} />
                support@torrenthub.ru
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Icon name="MessageCircle" size={16} />
                Telegram: @torrenthub
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Icon name="Github" size={16} />
                GitHub
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 TorrentHub. Все права защищены.</p>
          <p className="mt-2">
            Сайт не распространяет и не хранит файлы. Вся информация предоставлена в ознакомительных целях.
          </p>
        </div>
      </div>
    </footer>
  );
}
