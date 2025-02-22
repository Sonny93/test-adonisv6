import { useInterval } from '@mantine/hooks';
import { createContext, PropsWithChildren, useState } from 'react';

export const DATE_UPDATE_INTERVAL = 10_000;
export const TimerContext = createContext<number>(Date.now());

interface TimerProviderProps extends PropsWithChildren {}

export function TimerProvider({ children }: TimerProviderProps) {
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  useInterval(() => setCurrentTime(Date.now()), DATE_UPDATE_INTERVAL, {
    autoInvoke: true,
  });

  return (
    <TimerContext.Provider value={currentTime}>
      {children}
    </TimerContext.Provider>
  );
}
