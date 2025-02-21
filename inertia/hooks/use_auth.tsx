import { usePage } from '@inertiajs/react';
import type { InertiaPage } from '~/types/inertia';

export function useAuth() {
  const { auth } = usePage<InertiaPage>().props;
  return auth;
}
