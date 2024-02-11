import { TRANSPORT_OPTIONS } from '#config/mediasoup'
import StoreTransportService from '#services/store_transport_service'
import WorkerService from '#services/worker_service'
import { connectTransportValidator } from '#validators/transport'
import { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
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

    transport.on('icestatechange', (connectionState) =>
      logger.info(`${auth.user!.nickName} ice connection state: ${connectionState}`)
    )
    transport.on('dtlsstatechange', (connectionState) => {
      logger.info(`${auth.user!.nickName} dtls connection state: ${connectionState}`)
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
    // TODO: use validator
    const { kind, rtpParameters } = request.body()

    const foundTransport = this.storeTransportService.findTransport(auth.user!.id, 'send')
    if (!foundTransport) {
      logger.info(`${auth.user!.nickName} transport send not found`)
      return response.notFound({ error: 'Transport not found' })
    }

    const producer = await foundTransport.produce({ kind, rtpParameters })
    logger.info(`${auth.user!.nickName} produce`)

    response.ok({ producerId: producer.id })
  }

  async consumeMedia({ auth, request, response }: HttpContext) {}

  private extractTransportDataClient(transport: WebRtcTransport) {
    const { id, iceParameters, iceCandidates, dtlsParameters, sctpParameters } = transport
    return { id, iceParameters, iceCandidates, dtlsParameters, sctpParameters }
  }
}
