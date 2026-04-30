/**
 * Практичная проверка email: один @, длины по RFC 5321, домен как ASCII-hostname
 * (включая punycode xn--…). Не покрывает quoted-string и все edge cases RFC 5322.
 */
export function isValidEmail(raw: string): boolean {
  const email = raw.trim()
  if (!email || email.length > 254) return false

  const at = email.lastIndexOf('@')
  if (at <= 0 || at === email.length - 1) return false

  const local = email.slice(0, at)
  const domain = email.slice(at + 1).toLowerCase()

  if (local.length > 64 || domain.length > 253) return false
  if (/\s/.test(email)) return false
  if (local.startsWith('.') || local.endsWith('.')) return false
  if (local.includes('..')) return false

  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)) return false

  const labels = domain.split('.')
  if (labels.length < 2) return false

  for (const label of labels) {
    if (!label || label.length > 63) return false
    if (label.startsWith('-') || label.endsWith('-')) return false
    if (label.startsWith('xn--')) {
      if (!/^xn--[a-z0-9-]+$/.test(label)) return false
      continue
    }
    if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(label)) return false
  }

  const tld = labels[labels.length - 1]
  if (tld.length < 2 || /^[0-9]+$/.test(tld)) return false

  return true
}
