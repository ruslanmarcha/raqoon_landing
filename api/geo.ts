/**
 * Vercel Serverless: страна по IP и признак EU/EEA/UK.
 * Логика списка стран синхронизирована с `src/lib/euRegion.ts`.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node'

const EU_EEA_UK = new Set([
  'AT',
  'BE',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SK',
  'SI',
  'ES',
  'SE',
  'IS',
  'LI',
  'NO',
  'GB',
])

function isEUOrEEARegion(countryCode: string | null): boolean {
  if (!countryCode) return false
  return EU_EEA_UK.has(countryCode.toUpperCase())
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method && req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const raw =
    (req.headers['x-vercel-ip-country'] as string | undefined) ||
    (req.headers['cf-ipcountry'] as string | undefined) ||
    ''
  const countryCode = raw ? String(raw).toUpperCase() : null
  const isEUUser = isEUOrEEARegion(countryCode)

  res.setHeader('Cache-Control', 'private, max-age=0, must-revalidate')
  res.status(200).json({ countryCode, isEUUser })
}
