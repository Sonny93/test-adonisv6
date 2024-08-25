import { defineConfig } from '@adonisjs/inertia';

export default defineConfig({
  rootView: 'root',
  ssr: {
    enabled: true,
    entrypoint: 'inertia/app/ssr.tsx',
  },
  sharedData: {
    errors: (ctx) => ctx.session.flashMessages.get('errors'),
    flash: (ctx) => ctx.session.flashMessages.get('flash'),
    auth: async (ctx) => {
      await ctx.auth.check();
      return {
        user: ctx.auth.user,
        isAuthenticated: ctx.auth.isAuthenticated,
      };
    },
  },
});
