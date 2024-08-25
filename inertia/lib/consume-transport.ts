import type { ConnectionState, Device } from 'mediasoup-client/lib/types';
import { createTransport, handleConnect } from './transport.js';

export async function handleCreateConsumeTransport({
  channel,
  device,
  onStateChange,
}: {
  channel: Channel;
  device: Device;
  onStateChange?: (connState: ConnectionState) => void;
}) {
  const routerTransport = await createTransport(channel.id, 'recv');
  const transport = device.createRecvTransport(routerTransport);

  onStateChange && transport.on('connectionstatechange', onStateChange);
  transport.once('connect', (...args) =>
    handleConnect(channel, 'recv', ...args)
  );

  return transport;
}

export async function handleConsume(
  channel: Channel,
  { clientRtpCapabilities, producerId }
) {
  return await (
    await fetch(`/transport/${channel.id}/consume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientRtpCapabilities,
        producerId,
      }),
    })
  ).json();
}
