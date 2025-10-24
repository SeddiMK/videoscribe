import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, FileText, Zap, Lock, Globe, Clock } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">VideoToText</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Возможности
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              Как это работает
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Цены
            </a>
            <Link to="/upload">
              <Button variant="accent">Начать сейчас</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  Преобразуйте видео в текст{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    за минуты
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Мощная технология Whisper AI для точного распознавания речи из видео и аудио файлов. 
                  Быстро, точно, конфиденциально.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/upload">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    <Zap className="w-5 h-5" />
                    Начать бесплатно
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Смотреть демо
                </Button>
              </div>
              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Обработка за 2-5 минут</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Полная конфиденциальность</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary blur-3xl opacity-20 rounded-full"></div>
              <img 
                src={heroBanner} 
                alt="Video to Text Transcription" 
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Почему выбирают нас?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Передовые технологии для вашего удобства
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-4 border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold">Быстро</h3>
              <p className="text-muted-foreground">
                Обработка видео длительностью до 1 часа всего за 2-5 минут. 
                Не нужно ждать часами.
              </p>
            </Card>

            <Card className="p-8 space-y-4 border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold">Точно</h3>
              <p className="text-muted-foreground">
                Технология Whisper AI от OpenAI обеспечивает точность распознавания до 95%. 
                Поддержка более 50 языков.
              </p>
            </Card>

            <Card className="p-8 space-y-4 border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Lock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold">Конфиденциально</h3>
              <p className="text-muted-foreground">
                Ваши файлы автоматически удаляются после обработки. 
                Полная безопасность ваших данных.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Для кого это?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Студенты", desc: "Конспекты лекций и вебинаров" },
              { title: "Журналисты", desc: "Расшифровка интервью" },
              { title: "Подкастеры", desc: "Текстовые версии эпизодов" },
              { title: "Исследователи", desc: "Анализ видеоматериалов" }
            ].map((useCase, idx) => (
              <Card key={idx} className="p-6 text-center space-y-3 hover:shadow-lg transition-all">
                <h4 className="text-xl font-semibold">{useCase.title}</h4>
                <p className="text-muted-foreground">{useCase.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Как это работает?
            </h2>
            <p className="text-xl text-muted-foreground">
              Всего 3 простых шага
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Загрузите видео",
                desc: "Перетащите файл или вставьте ссылку на YouTube"
              },
              {
                step: "02",
                title: "Выберите настройки",
                desc: "Язык, модель распознавания, временные метки"
              },
              {
                step: "03",
                title: "Получите результат",
                desc: "Скачайте текст в удобном формате"
              }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                {idx < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-primary opacity-20" />
                )}
                <div className="space-y-4">
                  <div className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent opacity-20">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="relative overflow-hidden border-2 border-primary/20">
            <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
            <div className="relative p-12 md:p-20 text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold">
                Готовы начать?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Преобразуйте ваше первое видео в текст прямо сейчас. Быстро и бесплатно.
              </p>
              <Link to="/upload">
                <Button variant="hero" size="lg">
                  <Zap className="w-5 h-5" />
                  Начать преобразование
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">VideoToText</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Преобразование видео в текст с помощью AI
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Продукт</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Возможности</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Цены</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Контакты</a></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Документация</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Конфиденциальность</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
            <p>© 2025 VideoToText. Все права защищены. Домен: transcribe.zvon.online</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;