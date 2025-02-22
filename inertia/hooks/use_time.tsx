import { useContext } from 'react';
import { TimerContext } from '~/contexts/time_provider';

export const useTime = (): number => useContext(TimerContext);
