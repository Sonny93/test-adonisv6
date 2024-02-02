/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import transmit from '@adonisjs/transmit/services/main'

router.get('/', ({ inertia }: HttpContext) => {
  return inertia.render('home')
})
router.post('/chat', ({ request, response }) => {
  const message = request.input('message')
  transmit.broadcast('chat', { content: message })
  console.log('ok', message)
  return response.noContent()
})
