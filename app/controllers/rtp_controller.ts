import WorkerService from '#services/worker_service'

export default class RtpController {
  constructor(protected workerService = WorkerService) {}

  getRtpCapabilities = () => ({
    rtpCapabilities: this.workerService.router?.rtpCapabilities,
  })
}
