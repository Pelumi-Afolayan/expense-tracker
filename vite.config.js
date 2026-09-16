import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    // Generate the manifest and service worker that make
    // Expensidify installable as a Progressive Web App.
    VitePWA({
      // Automatically update the installed app when we deploy changes.
      registerType: 'autoUpdate',

      // Files that should also be included with the PWA.
      includeAssets: [
        'favicon.svg',
        'apple-touch-icon-180x180.png',
      ],

      // Allow us to inspect the PWA during local development.
      devOptions: {
        enabled: true,
      },

      // Information browsers use when installing the app.
      manifest: {
        name: 'Expensidify',
        short_name: 'Expensidify',
        description:
          'Track your income, expenses, and financial progress.',

        theme_color: '#10b981',
        background_color: '#f1f5f9',

        // Open the website without the normal browser interface.
        display: 'standalone',

        orientation: 'portrait-primary',
        start_url: '/',
        scope: '/',

        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})