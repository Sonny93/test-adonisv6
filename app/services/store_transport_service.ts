import User from '#models/user'
import { Transport } from 'mediasoup/node/lib/Transport.js'

class StoreTransportService {
  sendTransports = new Map<User['id'], Transport>()
  recvTransports = new Map<User['id'], Transport>()

  storeTransport = (userId: User['id'], direction: TransportDirection, transport: Transport) => {
    const existingTransport = this.findTransport(userId, direction)
    if (existingTransport) {
      existingTransport.close()
      this.deleteTransport(userId, direction)
    }

    if (direction === 'send') {
      this.sendTransports.set(userId, transport)
    } else {
      this.recvTransports.set(userId, transport)
    }
  }

  findTransport = (userId: User['id'], direction: TransportDirection) => {
    if (direction === 'send') {
      return this.sendTransports.get(userId)
    } else {
      return this.recvTransports.get(userId)
    }
  }

  deleteTransport = (userId: User['id'], direction: TransportDirection) => {
    if (direction === 'send') {
      this.sendTransports.delete(userId)
    } else {
      this.recvTransports.delete(userId)
    }
  }
}

export default new StoreTransportService()
