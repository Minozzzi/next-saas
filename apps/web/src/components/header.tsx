import { Flower2Icon, SlashIcon } from 'lucide-react'

import { getAbility } from '@/auth/auth'

import { OrganizationSwitcher } from './organization-switcher'
import { PendingInvites } from './pending-invites'
import { ProfileButton } from './profile-button'
import { ProjectSwitcher } from './project-switcher'
import { ThemeSwitcher } from './theme/theme-switcher'
import { Separator } from './ui/separator'

export async function Header() {
  const permissions = await getAbility()

  return (
    <header className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Flower2Icon className="size-6 text-white" />

        <SlashIcon className="text-border size-3 -rotate-[24deg] dark:invert" />

        <OrganizationSwitcher />

        {permissions?.can('get', 'Project') && (
          <>
            <SlashIcon className="text-border size-3 -rotate-[24deg]" />
            <ProjectSwitcher />
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <PendingInvites />
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </header>
  )
}
