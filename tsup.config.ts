import { defineConfig } from 'tsup'

export default defineConfig({
  entryPoints: {
    'simple-notify': 'src/index.ts'
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  keepNames: true,
  target: 'es5',
  format: ['esm', 'cjs', 'iife'],
  loader: { '.svg': 'text' },
  dts: true,
  outExtension({ format }) {
    if (format === 'esm')
      return {
        js: `.mjs`
      }

    const ext = format === 'iife' ? 'min' : format
    return {
      js: `.${ext}.js`
    }
  }
})
