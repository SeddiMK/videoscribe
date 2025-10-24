import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  Video, 
  Download, 
  Copy, 
  FileText, 
  Mail, 
  RefreshCw,
  Clock,
  FileType,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

interface ResultData {
  text: string;
  wordCount: number;
  duration: string;
  processingTime: string;
  settings: {
    mode: string;
    fileName?: string;
    youtubeUrl?: string;
    timestamps: boolean;
    subtitles: boolean;
  };
}

const Result = () => {
  const navigate = useNavigate();
  const [resultData, setResultData] = useState<ResultData | null>(null);

  useEffect(() => {
    const resultStr = sessionStorage.getItem('transcription-result');
    if (!resultStr) {
      navigate("/upload");
      return;
    }
    setResultData(JSON.parse(resultStr));
  }, [navigate]);

  const handleCopyToClipboard = () => {
    if (resultData) {
      navigator.clipboard.writeText(resultData.text);
      toast.success("Текст скопирован в буфер обмена!");
    }
  };

  const handleDownloadTXT = () => {
    if (resultData) {
      const blob = new Blob([resultData.text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'transcription.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Файл TXT загружен!");
    }
  };

  const handleDownloadDOCX = () => {
    toast.info("Функция экспорта в DOCX будет доступна в полной версии");
  };

  const handleDownloadSRT = () => {
    if (resultData?.settings.subtitles) {
      toast.info("Функция экспорта в SRT будет доступна в полной версии");
    } else {
      toast.error("Субтитры не были включены при обработке");
    }
  };

  const handleSendEmail = () => {
    toast.info("Функция отправки на email будет доступна в полной версии");
  };

  const handleProcessAnother = () => {
    sessionStorage.removeItem('transcription-settings');
    sessionStorage.removeItem('transcription-result');
    navigate("/upload");
  };

  if (!resultData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">VideoToText</span>
          </a>
          <Button variant="accent" onClick={handleProcessAnother}>
            <RefreshCw className="w-4 h-4" />
            Обработать ещё
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Success Banner */}
          <Card className="p-6 bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Обработка завершена!</h2>
                <p className="text-muted-foreground">
                  {resultData.settings.mode === "youtube" 
                    ? "Ваше YouTube видео успешно преобразовано в текст"
                    : `Файл "${resultData.settings.fileName}" успешно преобразован в текст`
                  }
                </p>
              </div>
            </div>
          </Card>

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center space-y-2 hover:shadow-lg transition-shadow">
              <FileType className="w-8 h-8 text-primary mx-auto" />
              <p className="text-3xl font-bold text-primary">{resultData.wordCount}</p>
              <p className="text-sm text-muted-foreground">Количество слов</p>
            </Card>
            
            <Card className="p-6 text-center space-y-2 hover:shadow-lg transition-shadow">
              <Video className="w-8 h-8 text-primary mx-auto" />
              <p className="text-3xl font-bold text-primary">{resultData.duration}</p>
              <p className="text-sm text-muted-foreground">Длительность видео</p>
            </Card>
            
            <Card className="p-6 text-center space-y-2 hover:shadow-lg transition-shadow">
              <Clock className="w-8 h-8 text-primary mx-auto" />
              <p className="text-3xl font-bold text-primary">{resultData.processingTime}</p>
              <p className="text-sm text-muted-foreground">Время обработки</p>
            </Card>
          </div>

          {/* Text Result */}
          <Card className="p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Результат транскрипции</h2>
                <Button variant="ghost" size="sm" onClick={handleCopyToClipboard}>
                  <Copy className="w-4 h-4" />
                  Копировать
                </Button>
              </div>
              
              <Textarea
                value={resultData.text}
                readOnly
                className="min-h-[400px] font-mono text-sm resize-none"
              />
            </div>
          </Card>

          {/* Action Buttons */}
          <Card className="p-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Экспорт результата</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-auto py-4 flex-col gap-2"
                  onClick={handleDownloadTXT}
                >
                  <FileText className="w-6 h-6" />
                  <span className="font-semibold">Скачать TXT</span>
                  <span className="text-xs text-muted-foreground">Простой текст</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto py-4 flex-col gap-2"
                  onClick={handleDownloadDOCX}
                >
                  <FileText className="w-6 h-6" />
                  <span className="font-semibold">Скачать DOCX</span>
                  <span className="text-xs text-muted-foreground">Word документ</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto py-4 flex-col gap-2"
                  onClick={handleDownloadSRT}
                  disabled={!resultData.settings.subtitles}
                >
                  <Download className="w-6 h-6" />
                  <span className="font-semibold">Скачать SRT</span>
                  <span className="text-xs text-muted-foreground">Субтитры</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto py-4 flex-col gap-2"
                  onClick={handleSendEmail}
                >
                  <Mail className="w-6 h-6" />
                  <span className="font-semibold">Отправить email</span>
                  <span className="text-xs text-muted-foreground">На почту</span>
                </Button>
              </div>
            </div>
          </Card>

          {/* Process Another */}
          <div className="flex justify-center pt-4">
            <Button variant="hero" size="lg" onClick={handleProcessAnother}>
              <RefreshCw className="w-5 h-5" />
              Обработать ещё одно видео
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;