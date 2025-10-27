import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Video,
  Upload as UploadIcon,
  Youtube,
  Settings,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { TranscribeTester } from '@/components/transTest/TranscribeTester';

const WHISPER_API_URL = 'http://localhost:8088';

const Upload = () => {
  const navigate = useNavigate();
  const [uploadMode, setUploadMode] = useState<'file' | 'youtube'>('file');
  const [file, setFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Settings
  const [language, setLanguage] = useState('auto');
  const [model, setModel] = useState('base');
  const [timestamps, setTimestamps] = useState(true);
  const [subtitles, setSubtitles] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const validTypes = [
        'video/mp4',
        'video/quicktime',
        'video/x-msvideo',
        'video/x-matroska',
        'audio/mpeg',
        'audio/wav',
        'audio/mp4',
      ];

      if (validTypes.includes(droppedFile.type)) {
        if (droppedFile.size <= 500 * 1024 * 1024) {
          // 500 MB
          setFile(droppedFile);
          toast.success('Файл загружен!');
        } else {
          toast.error('Файл слишком большой. Максимум 500 MB');
        }
      } else {
        toast.error('Неподдерживаемый формат файла');
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size <= 500 * 1024 * 1024) {
        setFile(selectedFile);
        toast.success('Файл загружен!');
      } else {
        toast.error('Файл слишком большой. Максимум 500 MB');
      }
    }
  };

  const validateYoutubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  const handleStartProcessing = () => {
    if (uploadMode === 'file' && !file) {
      toast.error('Пожалуйста, загрузите файл');
      return;
    }

    if (uploadMode === 'youtube') {
      if (!youtubeUrl) {
        toast.error('Пожалуйста, введите ссылку на YouTube');
        return;
      }
      if (!validateYoutubeUrl(youtubeUrl)) {
        toast.error('Неверная ссылка на YouTube');
        return;
      }
    }

    // Store settings in sessionStorage for Processing page
    sessionStorage.setItem(
      'transcription-settings',
      JSON.stringify({
        mode: uploadMode,
        fileName: file?.name,
        youtubeUrl,
        language,
        model,
        timestamps,
        subtitles,
      })
    );

    navigate('/processing');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background'>
      {/* Header */}
      <header className='border-b border-border/40 backdrop-blur-sm bg-background/80'>
        <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
          <a href='/' className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center'>
              <Video className='w-5 h-5 text-white' />
            </div>
            <span className='font-bold text-xl'>VideoToText</span>
          </a>
        </div>
      </header>

      <div className='container mx-auto px-4 py-12'>
        <div className='max-w-4xl mx-auto space-y-8'>
          {/* Title */}
          <div className='text-center space-y-4'>
            <h1 className='text-4xl md:text-5xl font-bold'>
              Загрузите ваше видео
            </h1>
            <p className='text-xl text-muted-foreground'>
              Выберите файл или вставьте ссылку на YouTube
            </p>
          </div>

          {/* Upload Mode Toggle */}
          <p>Тест транскрипции YouTube</p>
          <TranscribeTester />

          <div className='flex justify-center gap-4'>
            <Button
              variant={uploadMode === 'file' ? 'default' : 'outline'}
              onClick={() => setUploadMode('file')}
              className='w-40'
            >
              <UploadIcon className='w-4 h-4' />
              Файл
            </Button>
            <Button
              variant={uploadMode === 'youtube' ? 'default' : 'outline'}
              onClick={() => setUploadMode('youtube')}
              className='w-40'
            >
              <Youtube className='w-4 h-4' />
              YouTube
            </Button>
          </div>

          {/* Upload Area */}
          <Card className='p-8'>
            {uploadMode === 'file' ? (
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                  isDragging
                    ? 'border-primary bg-primary/5 scale-105'
                    : 'border-border hover:border-primary/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className='space-y-4'>
                  <div className='w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto'>
                    <UploadIcon className='w-8 h-8 text-white' />
                  </div>

                  {file ? (
                    <div className='space-y-2'>
                      <p className='text-lg font-semibold text-foreground'>
                        {file.name}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => setFile(null)}
                      >
                        Удалить
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div>
                        <p className='text-lg font-semibold mb-2'>
                          Перетащите файл сюда или нажмите для выбора
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          Поддерживаются: MP4, MOV, AVI, MKV, MP3, WAV, M4A
                        </p>
                        <p className='text-xs text-muted-foreground mt-1'>
                          Максимальный размер: 500 MB
                        </p>
                      </div>
                      <label htmlFor='file-upload'>
                        <Button variant='accent' className='cursor-pointer'>
                          Выбрать файл
                        </Button>
                        <input
                          id='file-upload'
                          type='file'
                          className='hidden'
                          accept='video/*,audio/*'
                          onChange={handleFileSelect}
                        />
                      </label>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className='space-y-4'>
                <div className='w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto'>
                  <Youtube className='w-8 h-8 text-white' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='youtube-url' className='text-base'>
                    Ссылка на YouTube видео
                  </Label>
                  <Input
                    id='youtube-url'
                    type='url'
                    placeholder='https://www.youtube.com/watch?v=...'
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className='h-12'
                  />
                  <p className='text-xs text-muted-foreground'>
                    Вставьте полную ссылку на видео YouTube
                  </p>
                </div>
              </div>
            )}
          </Card>

          {/* Settings */}
          <Card className='p-8'>
            <div className='space-y-6'>
              <div className='flex items-center gap-2 mb-4'>
                <Settings className='w-5 h-5 text-primary' />
                <h2 className='text-2xl font-semibold'>Настройки обработки</h2>
              </div>

              <div className='grid md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <Label htmlFor='language'>Язык распознавания</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id='language'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='auto'>Автоопределение</SelectItem>
                      <SelectItem value='ru'>Русский</SelectItem>
                      <SelectItem value='en'>Английский</SelectItem>
                      <SelectItem value='es'>Испанский</SelectItem>
                      <SelectItem value='fr'>Французский</SelectItem>
                      <SelectItem value='de'>Немецкий</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='model'>Модель Whisper</Label>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger id='model'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='tiny'>
                        Tiny (быстрая, менее точная)
                      </SelectItem>
                      <SelectItem value='base'>Base (рекомендуется)</SelectItem>
                      <SelectItem value='small'>
                        Small (точнее, медленнее)
                      </SelectItem>
                      <SelectItem value='medium'>
                        Medium (очень точная)
                      </SelectItem>
                      <SelectItem value='large'>
                        Large (максимальная точность)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='space-y-4'>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='timestamps'
                    checked={timestamps}
                    onCheckedChange={(checked) =>
                      setTimestamps(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor='timestamps'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Добавить временные метки (timestamps)
                  </Label>
                </div>

                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='subtitles'
                    checked={subtitles}
                    onCheckedChange={(checked) =>
                      setSubtitles(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor='subtitles'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Создать файл субтитров (.srt)
                  </Label>
                </div>
              </div>
            </div>
          </Card>

          {/* Start Button */}
          <div className='flex justify-center'>
            <Button
              variant='hero'
              size='lg'
              onClick={handleStartProcessing}
              className='w-full md:w-auto'
            >
              Начать обработку
              <ArrowRight className='w-5 h-5' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
