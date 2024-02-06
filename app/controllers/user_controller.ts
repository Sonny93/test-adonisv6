import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class UsersController {
  private redirectTo = '/'

  discord = ({ ally }: HttpContext) => ally.use('discord').redirect()

  async callbackAuth({ ally, auth, response, session }: HttpContext) {
    const discord = ally.use('discord')
    if (discord.accessDenied()) {
      session.flash('flash', 'Access was denied')
      return response.redirect(this.redirectTo)
    }

    if (discord.stateMisMatch()) {
      session.flash('flash', 'Request expired. Retry again')
      return response.redirect(this.redirectTo)
    }

    if (discord.hasError()) {
      session.flash('flash', discord.getError() || 'Something went wrong')
      return response.redirect(this.redirectTo)
    }

    const { emailVerificationState, token, ...discordUser } = await discord.user()
    const user = await User.firstOrCreate(
      {
        email: discordUser.email,
      },
      {
        ...discordUser,
        isVerified: emailVerificationState === 'verified',
        accessToken: token.token,
      }
    )

    await auth.use('web').login(user)
    session.flash('flash', 'Successfully authenticated')
    logger.info(`[${user.email}] auth success`)

    response.redirect('/')
  }

  async logout({ auth, response, session }: HttpContext) {
    await auth.use('web').logout()
    session.flash('flash', 'Successfully disconnected')
    logger.info(`[${auth.user?.email}] disconnected successfully`)
    response.redirect('/')
  }
}
