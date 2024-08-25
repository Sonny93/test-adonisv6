/// <reference path="../../adonisrc.ts" />

import { resolvePageComponent } from '@adonisjs/inertia/helpers';
import { Global } from '@emotion/react';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { cssReset, htmlBodyStyle } from '../global_styles';

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS';

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx')
    );
  },

  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <>
        <App {...props} />
        <Global styles={cssReset} />
        <Global styles={htmlBodyStyle} />
      </>
    );
  },
});
