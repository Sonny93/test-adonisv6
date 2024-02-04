import { css } from '@emotion/react'

export const cssReset = css({
  '*': {
    boxSizing: 'border-box',
    outline: 0,
    margin: 0,
    padding: 0,
    scrollBehavior: 'smooth',
  },

  'ul, li': {
    listStyle: 'none',
  },

  '.reset': {
    backgroundColor: 'inherit',
    color: 'inherit',
    padding: 0,
    margin: 0,
    border: 0,
  },

  'a': {
    'width': 'fit-content',
    'color': 'blue',
    'textDecoration': 'none',
    'borderBottom': '1px solid transparent',

    '&:hover': {
      borderBottom: '1px solid',
    },
  },

  'b': {
    fontWeight: 600,
    letterSpacing: '0.5px',
  },
})

export const htmlBodyStyle = css({
  'html, body, main': {
    height: '100%',
    width: '100%',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: '18px',
    color: '#333',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    transition: 'background-image 0.15s ease-in-out',
  },
})
