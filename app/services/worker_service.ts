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

    this.booted = true
    this.worker = await createWorker(WORKER_OPTIONS)
    this.router = await this.worker.createRouter({
      mediaCodecs: MEDIA_CODECS,
    })

    observer.on('newworker', (worker: Worker) => {
      logger.info('Worker created')

      worker.observer.on('close', () => logger.info('Worker closed'))
      worker.observer.on('newrouter', (router: Router) => logger.info('Router created', router.id))
    })
  }
}

export default new WorkerService()
