

type ContactUsIconProps = {
  iconClassName?: string
  name: string
  href?: string
  ariaLabel?: string
  anchorClassName?: string
}

export default function ContactUsIcon({
  iconClassName,
  name,
  href,
  ariaLabel,
  anchorClassName
}: ContactUsIconProps) {
  return (
    <a 
      href={href}
      aria-label={ariaLabel}
      className={anchorClassName}
    >
      <span className={iconClassName}>{name}</span>
    </a>
  )
}
