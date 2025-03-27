import { redirect } from 'next/navigation'
import { Fragment } from 'react'

import { isAuthenticated } from '@/auth/auth'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!(await isAuthenticated())) {
    redirect('/auth/sign-in')
  }

  return <Fragment>{children}</Fragment>
}
