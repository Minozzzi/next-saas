import { XCircle } from 'lucide-react'
import { redirect } from 'next/navigation'

import { getCurrentOrganization } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { shutdownOrganization } from '@/http/shutdown-organization'

export function ShutdownOrganizationButton() {
  async function shutdownOrganizationAction() {
    'use server'

    const currentOrganization = await getCurrentOrganization()

    if (!currentOrganization) {
      throw new Error('No current organization found')
    }

    await shutdownOrganization({
      organization: currentOrganization,
    })

    redirect('/')
  }

  return (
    <form action={shutdownOrganizationAction}>
      <Button type="submit" variant="destructive" className="w-56">
        <XCircle className="mr-2 size-4" />
        Shutdown organization
      </Button>
    </form>
  )
}
