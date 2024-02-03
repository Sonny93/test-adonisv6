import type { InertiaPage } from '@/types/inertia'
import { usePage } from '@inertiajs/react'

export default function useUser() {
  const { auth } = usePage<InertiaPage>().props
  return auth
}
