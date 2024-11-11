import { useState, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState<number>(0); // Основное состояние, обновляется сразу
  const [delayedCount, setDelayedCount] = useState<number>(0); // Состояние для отображения с задержкой

  // Используем useRef для хранения ID таймера, чтобы его можно было отменить
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Функция для увеличения `count` сразу и `delayedCount` с задержкой
  const incrementCountWithDelay = async () => {
    // Обновляем `count` сразу
    setCount((prevCount) => prevCount + 1);

    // Запускаем таймер с задержкой 5 секунд для обновления `delayedCount`
    timerRef.current = setTimeout(() => {
      setDelayedCount((prevDelayedCount) => prevDelayedCount + 1);
      timerRef.current = null; // Сбрасываем таймер после завершения
    }, 5000);
  };

  // Функция для отмены запланированного обновления `delayedCount`
  const cancelUpdate = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current); // Очищаем таймер
      timerRef.current = null; // Сбрасываем таймер
      alert("Запланированное обновление отменено");
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      
      <div className="card">
        {/* Кнопка для увеличения значения count */}
        <button onClick={incrementCountWithDelay}>
          count is {count}
        </button>
        
        {/* Табло с задержкой и кнопкой отмены */}
        <div className="counter-display">
          <p>Текущее значение (с задержкой): {delayedCount}</p>
          <button onClick={cancelUpdate}>Отменить обновление</button>
        </div>

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
