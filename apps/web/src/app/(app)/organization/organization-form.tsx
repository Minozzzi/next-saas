'use client'

import { AlertTriangle, CheckCircle2, Loader2Icon } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/user-form-state'

import {
  createOrganizationAction,
  type OrganizationSchema,
  updateOrganizationAction,
} from './actions'

type OrganizationFormProps = {
  isUpdating?: boolean
  initialData?: OrganizationSchema
}

export function OrganizationForm({
  isUpdating = false,
  initialData,
}: OrganizationFormProps) {
  const formAction = isUpdating
    ? updateOrganizationAction
    : createOrganizationAction

  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState(formAction)

  return (
    <form className="flex h-full flex-col gap-4" onSubmit={handleSubmit}>
      {!success && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save organization failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      {success && message && (
        <Alert variant="success">
          <CheckCircle2 className="size-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="name">Organization name</Label>
        <Input name="name" id="name" defaultValue={initialData?.name} />

        {errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="domain">E-mail domain</Label>
        <Input
          name="domain"
          id="domain"
          inputMode="email"
          placeholder="example.com"
          defaultValue={initialData?.domain ?? undefined}
        />

        {errors?.domain && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.domain[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <Checkbox
            name="shouldAttachUsersByDomain"
            id="shouldAttachUsersByDomain"
            defaultChecked={initialData?.shouldAttachUsersByDomain}
          />

          <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
            <span className="text-sm leading-none font-medium">
              Auto-join new members
            </span>
            <p className="text-muted-foreground text-sm">
              This will automatically invite all members with same e-mail domain
              to this organization.
            </p>
          </label>
        </div>

        {errors?.shouldAttachUsersByDomain && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.shouldAttachUsersByDomain[0]}
          </p>
        )}
      </div>

      <Button type="submit" className="mt-auto w-full" disabled={isPending}>
        {isPending ? (
          <Loader2Icon className="size-4 animate-spin" />
        ) : (
          'Save organization'
        )}
      </Button>
    </form>
  )
}
