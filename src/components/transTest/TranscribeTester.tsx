import React, { useState } from 'react';
import { useTranscribe } from '@/hooks/use-transcribe';

export const TranscribeTester: React.FC = () => {
  const [url, setUrl] = useState('');
  const { loading, result, error, transcribeVideo } = useTranscribe();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      transcribeVideo(url);
    }
  };

  console.log('result', result);

  return (
    <div className='p-4 max-w-xl mx-auto'>
      <h1 className='text-xl font-bold mb-4'>Тест транскрипции YouTube</h1>
      <form onSubmit={handleSubmit} className='mb-4'>
        <input
          type='text'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder='Вставьте ссылку на YouTube'
          className='border p-2 w-full mb-2'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 rounded'
          disabled={loading}
        >
          {loading ? 'Идёт транскрипция...' : 'Транскрибировать'}
        </button>
      </form>

      {error && (
        <div className='text-red-500 mb-2'>Ошибка: {JSON.stringify(error)}</div>
      )}
      {result && (
        <div className='bg-gray-100 p-4 rounded'>
          <h2 className='font-bold mb-2'>Результат:</h2>
          <pre className='whitespace-pre-wrap'>{result.text}</pre>
        </div>
      )}
    </div>
  );
};
