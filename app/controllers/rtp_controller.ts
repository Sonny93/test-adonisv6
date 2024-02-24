import { TRANSPORT_OPTIONS } from '#config/mediasoup'
import StoreTransportService from '#services/store_transport_service'
import WorkerService from '#services/worker_service'
import { connectTransportValidator } from '#validators/transport'
import { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import transmit from '@adonisjs/transmit/services/main'
import { WebRtcTransport } from 'mediasoup/node/lib/WebRtcTransport.js'

export default class RtpController {
  constructor(
    protected workerService = WorkerService,
    protected storeTransportService = StoreTransportService
  ) {}

  getRtpCapabilities = () => ({
    rtpCapabilities: this.workerService.router?.rtpCapabilities,
  })

  async createTransport({ auth, request, response }: HttpContext) {
    const direction = request.param('direction')
    const transport = await this.workerService.router!.createWebRtcTransport({
      ...TRANSPORT_OPTIONS,
      appData: { userId: auth.user!.id },
    })

    transport.on('trace', (trace) =>
      console.log(`${auth.user!.nickName} ice connection state: ${trace}`)
    )
    transport.on('@newproducer', console.log)
    transport.on('@producerclose', console.log)
    transport.on('dtlsstatechange', console.log)
    transport.on('@close', console.log)
    transport.on('icestatechange', (connectionState) =>
      console.log(`${auth.user!.nickName} ice connection state: ${connectionState}`)
    )
    transport.on('dtlsstatechange', (connectionState) => {
      console.log(`${auth.user!.nickName} dtls connection state: ${connectionState}`)
      if (connectionState === 'closed') {
        this.storeTransportService.deleteTransport(auth.user!.id, direction)
      }
    })

    this.storeTransportService.storeTransport(auth.user!.id, direction, transport)
    return response.send(this.extractTransportDataClient(transport))
  }

  async connectTransport({ auth, request, response }: HttpContext) {
    const direction = request.param('direction')
    const { dtlsParameters } = await request.validateUsing(connectTransportValidator)

    const foundTransport = this.storeTransportService.findTransport(auth.user!.id, direction)
    if (!foundTransport) {
      logger.info(`${auth.user!.nickName} transport ${direction} not found`)
      return response.notFound('Transport not found')
    }

    await foundTransport.connect({ dtlsParameters })
    logger.info(`${auth.user!.nickName} connected to ${direction} transport`)

    response.ok('ok')
  }

  async produceMedia({ auth, request, response }: HttpContext) {
    const channelId = request.param('channel_id')
    // TODO: use validator
    const { kind, rtpParameters } = request.body()

    const foundTransport = this.storeTransportService.findTransport(auth.user!.id, 'send')
    if (!foundTransport) {
      logger.info(`${auth.user!.nickName} send transport not found`)
      return response.notFound({ error: 'Send transport not found' })
    }

    const producer = await foundTransport.produce({ kind, rtpParameters })
    logger.info(`${auth.user!.nickName} produce`)

    transmit.broadcast(`channels/${channelId}/produce`, {
      producerId: producer.id,
      kind: 'video',
      user: auth.user,
    })
    response.ok({ producerId: producer.id })
  }

  async consumeMedia({ auth, request, response }: HttpContext) {
    const { clientRtpCapabilities, producerId } = request.body()
    if (
      !this.workerService.router?.canConsume({ producerId, rtpCapabilities: clientRtpCapabilities })
    ) {
      return response.badRequest({ error: 'Cannot consume this producer' })
    }

    const foundTransport = this.storeTransportService.findTransport(auth.user!.id, 'recv')
    if (!foundTransport) {
      logger.info(`${auth.user!.nickName} recv transport not found`)
      return response.notFound({ error: 'Recv transport not found' })
    }

    const consumer = await foundTransport.consume({
      producerId,
      rtpCapabilities: clientRtpCapabilities,
    })

    return response.ok({
      consumerId: consumer.id,
      rtpParameters: consumer.rtpParameters,
    })
  }

  private extractTransportDataClient(transport: WebRtcTransport) {
    const { id, iceParameters, iceCandidates, dtlsParameters, sctpParameters } = transport
    return { id, iceParameters, iceCandidates, dtlsParameters, sctpParameters }
  }
}
