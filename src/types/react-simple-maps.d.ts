declare module 'react-simple-maps' {
  import type { ComponentType, CSSProperties, ReactNode, SVGProps } from 'react'

  export type ComposableMapProps = SVGProps<SVGSVGElement> & {
    projection?: string
    projectionConfig?: { scale?: number; center?: [number, number] }
    width?: number
    height?: number
  }

  export type GeographiesChildrenArgs = {
    geographies: Array<{
      rsmKey: string
      id?: string | number
      properties?: { name?: string }
    }>
  }

  export const ComposableMap: ComponentType<ComposableMapProps>
  export const Geographies: ComponentType<{
    geography: string
    children: (args: GeographiesChildrenArgs) => ReactNode
  }>
  export const Geography: ComponentType<
    SVGProps<SVGPathElement> & {
      geography: unknown
      style?: { default?: CSSProperties; hover?: CSSProperties; pressed?: CSSProperties }
    }
  >
}
