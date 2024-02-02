/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const MessagesController = () => import('#controllers/messages_controller')
import router from '@adonisjs/core/services/router'

router.get('/', [MessagesController, 'index'])
router.post('/chat', [MessagesController, 'createMessage'])
