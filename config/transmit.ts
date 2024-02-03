import { RedisTransport, defineConfig } from '@adonisjs/transmit'

export default defineConfig({
  transport: {
    driver: RedisTransport,
  },
})
