import { RtpDeviceContext } from '~/contexts/rtpDeviceContext';
import { useContext } from 'react';

export default function useRtpDevice() {
  return useContext(RtpDeviceContext);
}
