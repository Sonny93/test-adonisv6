import { ApplicationService } from '@adonisjs/core/types'

export default class MediasoupProvider {
  constructor(protected app: ApplicationService) {}

  async ready() {
    if (this.app.getEnvironment() === 'web') {
      await import('#start/mediasoup')
    }
  }
}
