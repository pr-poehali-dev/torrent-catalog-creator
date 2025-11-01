import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
  const faqs = [
    {
      question: 'Как скачать торрент?',
      answer: 'Выберите интересующую игру, перейдите на страницу торрента и нажмите кнопку "Скачать торрент". После этого файл откроется в вашем торрент-клиенте (uTorrent, qBittorrent и др.).'
    },
    {
      question: 'Какой торрент-клиент использовать?',
      answer: 'Рекомендуем использовать qBittorrent (бесплатный, без рекламы) или uTorrent. Оба клиента поддерживают все современные функции торрент-протокола.'
    },
    {
      question: 'Безопасно ли скачивать торренты?',
      answer: 'Все торренты на нашем сайте проверены на вирусы. Однако рекомендуем использовать антивирус и VPN для дополнительной безопасности.'
    },
    {
      question: 'Что делать если торрент не скачивается?',
      answer: 'Проверьте: 1) Открыты ли порты в торрент-клиенте, 2) Не блокирует ли антивирус соединение, 3) Достаточно ли свободного места на диске, 4) Есть ли активные раздающие (сиды).'
    },
    {
      question: 'Как установить игру после скачивания?',
      answer: 'После скачивания найдите файл setup.exe или install.exe в папке с игрой. Запустите его и следуйте инструкциям установщика. Если игра требует crack, файлы для активации обычно находятся в папке CRACK.'
    },
    {
      question: 'Почему низкая скорость скачивания?',
      answer: 'Скорость зависит от количества раздающих (сидов). Чем больше сидов, тем выше скорость. Также проверьте настройки ограничения скорости в торрент-клиенте.'
    },
    {
      question: 'Можно ли играть по сети в пиратские игры?',
      answer: 'В большинстве случаев нет, так как требуется лицензионная версия. Однако некоторые игры поддерживают LAN-игру или игру через эмуляторы вроде Hamachi или Tunngle.'
    },
    {
      question: 'Что означают системные требования?',
      answer: 'Минимальные требования - это минимум для запуска игры (может тормозить). Рекомендуемые - для комфортной игры на средних/высоких настройках.'
    },
    {
      question: 'Как добавить свой торрент на сайт?',
      answer: 'Для добавления торрентов необходимо зарегистрироваться и получить права модератора. Свяжитесь с администрацией через форму обратной связи.'
    },
    {
      question: 'Легально ли скачивание торрентов?',
      answer: 'Торрент-технология сама по себе легальна. Однако скачивание защищенного авторским правом контента может нарушать законодательство вашей страны. Мы рекомендуем поддерживать разработчиков покупкой лицензионных версий.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Часто задаваемые вопросы</h1>
          <p className="text-muted-foreground mb-8">
            Ответы на популярные вопросы о скачивании и установке игр
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 p-6 bg-card border rounded-lg">
            <h2 className="text-xl font-bold mb-2">Не нашли ответ?</h2>
            <p className="text-muted-foreground mb-4">
              Свяжитесь с нами, и мы постараемся помочь!
            </p>
            <div className="flex gap-4">
              <a 
                href="mailto:support@torrenthub.ru"
                className="text-primary hover:underline"
              >
                support@torrenthub.ru
              </a>
              <span className="text-muted-foreground">•</span>
              <a 
                href="https://t.me/torrenthub"
                className="text-primary hover:underline"
              >
                Telegram: @torrenthub
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
