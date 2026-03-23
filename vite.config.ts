import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2'

const SEO_ROUTES: { path: string; priority: string; changefreq: string }[] = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/ww', priority: '0.9', changefreq: 'weekly' },
  { path: '/download', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/migration', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.5', changefreq: 'yearly' },
  { path: '/terms', priority: '0.5', changefreq: 'yearly' },
  { path: '/contact', priority: '0.5', changefreq: 'yearly' },
  { path: '/refund', priority: '0.5', changefreq: 'yearly' },
]

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL ?? '').replace(/\/$/, '')

  return {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/'))
              return 'react-vendor'
            if (id.includes('node_modules/react-router')) return 'router'
            if (id.includes('node_modules/i18next') || id.includes('node_modules/react-i18next'))
              return 'i18n'
          },
        },
      },
    },
    plugins: [
      react(),
      ...(mode === 'production'
        ? [
            compression({
              algorithms: ['gzip', 'brotliCompress'],
              exclude: [/\.(br|gz)$/, /\.map$/],
            }),
          ]
        : []),
      {
        name: 'seo-robots-sitemap',
        closeBundle() {
          const outDir = path.resolve('dist')
          if (!fs.existsSync(outDir)) return

          const robots = siteUrl
            ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
            : `User-agent: *\nAllow: /\n`
          fs.writeFileSync(path.join(outDir, 'robots.txt'), robots)

          if (!siteUrl) {
            console.warn(
              '[seo] VITE_SITE_URL is not set — sitemap.xml was not generated. Set it in .env for production builds.',
            )
            return
          }

          const urls = SEO_ROUTES.map(
            ({ path: p, priority, changefreq }) =>
              `  <url>\n    <loc>${siteUrl}${p || '/'}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
          ).join('\n')

          const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
          fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap)
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  }
})
