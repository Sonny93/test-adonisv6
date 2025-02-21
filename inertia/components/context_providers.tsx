import type { RtpCapabilities } from 'mediasoup-client/lib/RtpParameters';
import { PropsWithChildren } from 'react';
import { ChannelContextProvider } from '~/contexts/channelContext';
import { MediaTransportsContextProvider } from '~/contexts/mediaTransportsContext';
import { MessagesContextProvider } from '~/contexts/messagesContext';
import { RtpDeviceContextProvider } from '~/contexts/rtpDeviceContext';
import { TransmitContextProvider } from '~/contexts/transmitContext';
import { ChannelExtended } from '~/types';

interface ContextProvidersProps extends PropsWithChildren {
  channel: ChannelExtended;
  routerRtpCapabilities: {
    rtpCapabilities: RtpCapabilities;
  };
}
export const ContextProviders = ({
  children,
  channel,
  routerRtpCapabilities: { rtpCapabilities },
}: ContextProvidersProps) => (
  <TransmitContextProvider>
    <ChannelContextProvider channel={channel}>
      <MessagesContextProvider messages={channel.messages}>
        <RtpDeviceContextProvider routerRtpCapabilities={rtpCapabilities}>
          <MediaTransportsContextProvider mediaTransports={[]}>
            {children}
          </MediaTransportsContextProvider>
        </RtpDeviceContextProvider>
      </MessagesContextProvider>
    </ChannelContextProvider>
  </TransmitContextProvider>
);
