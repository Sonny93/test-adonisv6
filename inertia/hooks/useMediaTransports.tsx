import { MediaTransportsContext } from '~/contexts/mediaTransportsContext';
import { useContext } from 'react';

export default function useMediaTransports() {
  return useContext(MediaTransportsContext);
}
