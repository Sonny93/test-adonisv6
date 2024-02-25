import { MEDIA_CODECS, WORKER_OPTIONS } from '#config/mediasoup'
import logger from '@adonisjs/core/services/logger'
import { createWorker, observer } from 'mediasoup'
import { Router, Worker } from 'mediasoup/node/lib/types.js'

class WorkerService {
  worker: Worker | null = null
  router: Router | null = null
  private booted = false

  async boot() {
    /**
     * Ignore multiple calls to the boot method
     */
    if (this.booted) {
      return
    }

    observer.on('newworker', (worker: Worker) => {
      logger.debug('Worker created')

      worker.observer.on('close', () => logger.debug('Worker closed'))
      worker.observer.on('newrouter', (router: Router) => logger.debug('Router created', router.id))
    })

    this.booted = true
    this.worker = await createWorker(WORKER_OPTIONS)
    this.router = await this.worker.createRouter({
      mediaCodecs: MEDIA_CODECS,
    })
  }
}

export default new WorkerService()
