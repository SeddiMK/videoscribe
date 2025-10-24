import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Video, X } from "lucide-react";

const Processing = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState("Инициализация...");
  const [estimatedTime, setEstimatedTime] = useState(5);

  useEffect(() => {
    // Get settings from sessionStorage
    const settingsStr = sessionStorage.getItem('transcription-settings');
    if (!settingsStr) {
      navigate("/upload");
      return;
    }

    const settings = JSON.parse(settingsStr);
    
    // Simulate processing stages
    const stages = [
      { progress: 0, status: "Инициализация...", duration: 1000 },
      { 
        progress: 20, 
        status: settings.mode === "youtube" ? "Загрузка видео с YouTube..." : "Обработка файла...", 
        duration: 2000 
      },
      { progress: 40, status: "Извлечение аудио...", duration: 2000 },
      { progress: 60, status: "Распознавание речи...", duration: 3000 },
      { progress: 80, status: "Генерация текста...", duration: 2000 },
      { progress: 95, status: "Финализация...", duration: 1000 },
      { progress: 100, status: "Готово!", duration: 500 }
    ];

    let currentStage = 0;
    
    const processStages = () => {
      if (currentStage < stages.length) {
        const stage = stages[currentStage];
        setProgress(stage.progress);
        setCurrentStatus(stage.status);
        
        // Update estimated time
        const remainingStages = stages.slice(currentStage + 1);
        const remainingTime = remainingStages.reduce((sum, s) => sum + s.duration, 0) / 1000;
        setEstimatedTime(Math.ceil(remainingTime / 60));
        
        setTimeout(() => {
          currentStage++;
          if (currentStage === stages.length) {
            // Store mock result data
            sessionStorage.setItem('transcription-result', JSON.stringify({
              text: `Это демонстрационный результат распознавания речи из вашего видео. 

В реальном приложении здесь будет полный текст, распознанный из аудиодорожки видео с помощью технологии Whisper AI.

Текст будет точным и отформатированным, с возможностью включения временных меток для синхронизации с оригинальным видео.

Основные возможности:
- Высокая точность распознавания (до 95%)
- Поддержка более 50 языков
- Автоматическая пунктуация
- Распознавание имен и терминов
- Временные метки для каждого фрагмента

Это позволяет использовать результаты для:
1. Создания конспектов лекций
2. Расшифровки интервью
3. Генерации субтитров
4. Индексации видеоконтента
5. Анализа и обработки информации

Технология Whisper AI от OpenAI обеспечивает высочайшее качество распознавания речи, даже при наличии фонового шума или акцентов.`,
              wordCount: 142,
              duration: "10:30",
              processingTime: "3:45",
              settings: settings
            }));
            
            setTimeout(() => {
              navigate("/result");
            }, 500);
          } else {
            processStages();
          }
        }, stage.duration);
      }
    };

    processStages();
  }, [navigate]);

  const handleCancel = () => {
    sessionStorage.removeItem('transcription-settings');
    navigate("/upload");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 md:p-12 space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center animate-pulse">
            <Video className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">
            Обработка видео
          </h1>
          <p className="text-muted-foreground">
            Пожалуйста, подождите, это может занять несколько минут
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-4">
          <Progress value={progress} className="h-3" />
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-foreground">{currentStatus}</span>
            <span className="text-muted-foreground">{progress}%</span>
          </div>
        </div>

        {/* Status Info */}
        <div className="grid grid-cols-2 gap-4 p-6 bg-secondary/30 rounded-xl">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{progress}%</p>
            <p className="text-sm text-muted-foreground">Завершено</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">~{estimatedTime} мин</p>
            <p className="text-sm text-muted-foreground">Осталось</p>
          </div>
        </div>

        {/* Visual Animation */}
        <div className="flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-12 bg-gradient-primary rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: "1s"
              }}
            />
          ))}
        </div>

        {/* Cancel Button */}
        <div className="flex justify-center pt-4">
          <Button variant="ghost" onClick={handleCancel}>
            <X className="w-4 h-4" />
            Отменить обработку
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Processing;