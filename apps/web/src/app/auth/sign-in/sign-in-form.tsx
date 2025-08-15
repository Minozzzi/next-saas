'use client'

import { AlertTriangleIcon, Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import githubIcon from '@/assets/github-icon.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hooks/user-form-state'

import { signInWithGithubAction } from '../actions'
import { signInWithEmailAndPasswordAction } from './actions'

export function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [{ success, message, errors }, handleSignIn, isPending] = useFormState(
    signInWithEmailAndPasswordAction,
    () => {
      router.push('/')
    },
  )

  return (
    <div className="space-y-4">
      <form onSubmit={handleSignIn} className="space-y-4">
        {!success && message && (
          <Alert variant="destructive">
            <AlertTriangleIcon className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            name="email"
            id="email"
            defaultValue={searchParams.get('email') ?? ''}
          />

          {errors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" id="password" />

          {errors?.password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.password[0]}
            </p>
          )}

          <Link
            href="/auth/forgot-password"
            className="text-foreground text-xs font-medium hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            'Sign in with e-mail'
          )}
        </Button>

        <Button asChild variant="link" className="w-full" size="sm">
          <Link href="/auth/sign-up">Create new account</Link>
        </Button>

        <Separator />
      </form>

      <form action={signInWithGithubAction}>
        <Button type="submit" variant="outline" className="w-full">
          <Image src={githubIcon} alt="" className="mr-2 size-4 dark:invert" />
          Sign in with GitHub
        </Button>
      </form>
    </div>
  )
}
