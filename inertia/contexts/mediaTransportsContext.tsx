import type { MediaTransport, NewMediaTransport } from '~/types/transport';
import { createContext, useState, type ReactNode } from 'react';

export type MediaTransportsContextType = {
  mediaTransports: MediaTransport[];
  addMediaTransport: (mediaTransport: MediaTransport) => void;
  removeMediaTransport: (mediaTransport: NewMediaTransport) => void;
};

const iTransportsContextState = {
  mediaTransports: [],
  addMediaTransport: () => {},
  removeMediaTransport: () => {},
};

export const MediaTransportsContext = createContext<MediaTransportsContextType>(
  iTransportsContextState
);

export function MediaTransportsContextProvider({
  children,
  mediaTransports: mediaTransportParam,
}: {
  children: ReactNode;
  mediaTransports: MediaTransportsContextType['mediaTransports'];
}) {
  const [mediaTransports, setMediaTransports] =
    useState<MediaTransport[]>(mediaTransportParam);
  const handleAddTransport = (mediaTransport: MediaTransport) =>
    setMediaTransports((transports) => {
      const newTransports = [...transports];
      newTransports.push(mediaTransport);
      return newTransports;
    });

  const handleRemoveTransport = (newMediaTransport: NewMediaTransport) => {
    setMediaTransports((_transports) => {
      const newTransports = [..._transports];
      const transportIndex = newTransports.findIndex(
        (m) => m.producerId === newMediaTransport.producerId
      );
      if (transportIndex !== -1) {
        newTransports.splice(transportIndex, 1);
      }
      return newTransports;
    });
  };

  return (
    <MediaTransportsContext.Provider
      value={{
        mediaTransports: mediaTransports,
        addMediaTransport: handleAddTransport,
        removeMediaTransport: handleRemoveTransport,
      }}
    >
      {children}
    </MediaTransportsContext.Provider>
  );
}
