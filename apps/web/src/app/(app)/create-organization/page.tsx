import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function CreateOrganizationPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create organization</h1>

      <form className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="organizationName">Organization name</Label>
          <Input name="organizationName" id="organizationName" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="emailDomain">E-mail domain</Label>
          <Input
            name="emailDomain"
            id="emailDomain"
            inputMode="email"
            placeholder="example.com"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Checkbox
              name="shouldAttachUsersByDomain"
              id="shouldAttachUsersByDomain"
            />

            <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
              <span className="text-sm leading-none font-medium">
                Auto-join new members
              </span>
              <p className="text-muted-foreground text-sm">
                This will automatically invite all members with same e-mail
                domain to this organization.
              </p>
            </label>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Save organization
        </Button>
      </form>
    </div>
  )
}
