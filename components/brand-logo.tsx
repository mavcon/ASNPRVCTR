// BrandLogo component that can be used with or without a link wrapper
// To prevent nested links, this component accepts a withLink prop

interface BrandLogoProps {
  withLink?: boolean
}

export function BrandLogo({ withLink = true }: BrandLogoProps) {
  const logo = (
    <span className="text-xl font-bold">
      <span className="text-red-600">亞</span> ASNPRVCTR
    </span>
  )

  if (withLink) {
    return (
      <a href="/" className="flex items-center space-x-2">
        {logo}
      </a>
    )
  }

  return <div className="flex items-center space-x-2">{logo}</div>
}

