import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  keepNames: false,
  target: 'es5',
  format: ['esm', 'cjs', 'iife'],
  loader: {'.svg': 'text'},
  dts: true,
})
