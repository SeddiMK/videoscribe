import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://185.250.181.254:3001';

// const API_URL = import.meta.env.VITE_IP_ADDRESS
//   ? `http://${import.meta.env.VITE_IP_ADDRESS}:3001`
//   : 'http://185.250.181.254:3001';

// console.log('IP_ADDRESS', import.meta.env.VITE_IP_ADDRESS);

//TODO: not any
interface TranscribeResponse {
  text: string;
  [key: string]: any;
}

interface TranscribeError {
  error: string;
  details?: string;
}

export function useTranscribe() {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<TranscribeError | string | null>(null);

  const transcribeVideo = async (url: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<TranscribeResponse>(
        `${API_URL}/transcribe`,
        { url }
      );
      setResult(response?.data?.text || '');
    } catch (err: unknown) {
      // Правильная проверка для axios ошибок
      if (
        err &&
        typeof err === 'object' &&
        'isAxiosError' in err &&
        (err as any).isAxiosError
      ) {
        const axiosErr = err as any;
        setError(axiosErr.response?.data || axiosErr.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Неизвестная ошибка');
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, error, transcribeVideo };
}
