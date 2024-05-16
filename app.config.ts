export default defineAppConfig({
  ui: {
    primary: 'blue',
    variables: {
      light: {
        background: '255 255 255',
        foreground: 'var(--color-gray-700)'
      },
      dark: {
        background: 'var(--color-gray-900)',
        foreground: 'var(--color-gray-200)'
      },
      header: {
        height: '4rem'
      }
    },
  },
  seo: {
    siteName: '图灵智考'
  },
  toc: {
    title: '本文导读'
  }
})
