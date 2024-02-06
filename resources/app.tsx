import { Global } from '@emotion/react'
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { cssReset, htmlBodyStyle } from './global_styles'

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('./pages/**/*.tsx', { eager: true })
    return pages[`./pages/${name}.tsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <>
        <App {...props} />
        <Global styles={cssReset} />
        <Global styles={htmlBodyStyle} />
      </>
    )
  },
})
