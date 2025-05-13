'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'

type NavLingProps = ComponentProps<typeof Link>

export function NavLink(props: NavLingProps) {
  const pathname = usePathname()

  const hrefPath =
    typeof props.href === 'string' ? props.href : (props.href?.pathname ?? '')
  const isCurrent = hrefPath === pathname

  return <Link data-current={isCurrent} {...props}></Link>
}
