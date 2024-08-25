import { HttpContext } from '@adonisjs/core/http';
import logger from '@adonisjs/core/services/logger';

export default class LogRequest {
  async handle({ request }: HttpContext, next: () => Promise<void>) {
    if (
      request.url().startsWith('/node_modules') ||
      request.url().startsWith('/__transmit') ||
      request.url().startsWith('/inertia') ||
      request.url().startsWith('/@') ||
      request.url().endsWith('.ico')
    )
      return await next();
    logger.info(`-> ${request.method()}: ${request.url()}`);
    await next();
  }
}
