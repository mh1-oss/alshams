import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Serves api/contact.ts during `vite dev` so the contact form works locally
// (in production, Vercel serves the /api folder as serverless functions).
function devApiContact(): Plugin {
  return {
    name: 'dev-api-contact',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        const chunks: Buffer[] = []
        for await (const chunk of req) chunks.push(chunk as Buffer)
        const body = Buffer.concat(chunks).toString()
        const { default: handler } = await server.ssrLoadModule('/api/contact.ts')
        const response: Response = await handler(
          new Request('http://localhost/api/contact', {
            method: req.method ?? 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: req.method === 'POST' ? body : undefined,
          }),
        )
        res.statusCode = response.status
        res.setHeader('Content-Type', response.headers.get('Content-Type') ?? 'application/json')
        res.end(await response.text())
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Expose non-VITE_ vars (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID) to the dev API middleware
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), devApiContact()],
    build: {
      // lightningcss strips the unprefixed `backdrop-filter`, breaking the frosted-glass header
      cssMinify: false,
    },
  }
})
