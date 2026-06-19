import styles from './BrandLogo.module.css'

const LOGO_SRC = '/raqoon-logo-horizontal.svg'

type BrandLogoProps = {
  className?: string
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <img
      src={LOGO_SRC}
      alt="Raqoon"
      className={`${styles.logo} ${className ?? ''}`.trim()}
      width={142}
      height={30}
      decoding="async"
    />
  )
}
