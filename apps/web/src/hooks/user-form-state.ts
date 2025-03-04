import { type FormEvent, useState, useTransition } from 'react'

type FormState = {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: () => Promise<void> | void,
  initialState: FormState = {
    success: false,
    message: null,
    errors: null,
  },
) {
  const [isPending, startTransition] = useTransition()
  const [formState, setFormState] = useState<FormState>(initialState)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)
      setFormState(state)

      if (state.success && onSuccess) {
        await onSuccess()
      }
    })
  }

  return [formState, handleSubmit, isPending] as const
}
