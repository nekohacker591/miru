import { resolve } from 'node:path'

import { sveltekit } from '@sveltejs/kit/vite'
import license from 'rollup-plugin-license'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    sveltekit(),
    license({
      thirdParty: {
        allow: '(MIT OR Apache-2.0 OR ISC OR BSD-3-Clause OR BSD-2-Clause)',
        output: resolve(import.meta.dirname, './build/LICENSE.txt'),
        includeSelf: true
      }
    })
  ],
  resolve: {
    alias: {
      // thank you bottleneck for importing useless modules
      './RedisConnection': resolve(import.meta.dirname, 'src/patches/empty.cjs'),
      './RedisConnection.js': resolve(import.meta.dirname, 'src/patches/empty.cjs'),
      './RedisDatastore': resolve(import.meta.dirname, 'src/patches/empty.cjs'),
      './IORedisConnection': resolve(import.meta.dirname, 'src/patches/empty.cjs'),
      './Scripts': resolve(import.meta.dirname, 'src/patches/empty.cjs'),
      // no exports :/
      'bittorrent-tracker/lib/client/websocket-tracker.js': resolve(import.meta.dirname, 'node_modules/bittorrent-tracker/lib/client/websocket-tracker.js')
    }
  },
  server: {
    port: 8080,
    allowedHosts: ['miru-vz3c.onrender.com']
  },
  build: {
    target: 'esnext',
    sourcemap: true
  },
  ssr: {
    target: 'webworker'
  },
  optimizeDeps: {
    exclude: ['anitomyscript']
  }
})
