/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const MessagesController = () => import('#controllers/messages_controller')
const UserController = () => import('#controllers/user_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/discord/callback', [UserController, 'callbackAuth'])
router.get('/discord/redirect', [UserController, 'discord'])

router
  .group(() => {
    router.get('/', [MessagesController, 'index'])
    router.get('/logout', [UserController, 'logout'])
    router.post('/chat', [MessagesController, 'createMessage'])
  })
  .middleware([middleware.auth()])

router.get('*', async ({ inertia }) => inertia.render('error_404'))
