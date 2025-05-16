import { getAbility } from '@/auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { OrganizationForm } from '../../organization-form'
import { ShutdownOrganizationButton } from './shutdown-organization-button'

export default async function SettingsPage() {
  const permissions = await getAbility()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')
  const canShutdownOrganization = permissions?.can('delete', 'Organization')

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings Page</h1>

      <div className="space-y-4">
        {canUpdateOrganization && (
          <Card>
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>

              <CardDescription>
                Update your organization details
              </CardDescription>
            </CardHeader>

            <CardContent>
              <OrganizationForm />
            </CardContent>
          </Card>
        )}

        {canGetBilling && <div>billing settings will go here</div>}

        {canShutdownOrganization && (
          <Card>
            <CardHeader>
              <CardTitle>Shutdown Organization</CardTitle>
              <CardDescription>
                This will delete all organization data including projects. You
                cannot undo this action.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ShutdownOrganizationButton />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
