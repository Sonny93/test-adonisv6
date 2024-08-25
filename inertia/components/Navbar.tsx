import type { InertiaPage } from '@/types/inertia';
import { Link, usePage } from '@inertiajs/react';
import RoundedImage from './RoundedImage.js';

export default function Navbar() {
  const { auth } = usePage<InertiaPage>().props;
  return (
    <nav
      css={{
        padding: '.75em',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <ul
        css={{
          '&, & li a': {
            display: 'flex',
            gap: '.35em',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        <li>
          <Link href="/">Channels</Link>
        </li>
        {auth.isAuthenticated && (
          <li>
            <Link href="/">
              {auth.user?.avatarUrl && (
                <RoundedImage src={auth.user?.avatarUrl} />
              )}{' '}
              {auth.user!.nickName}
            </Link>
          </li>
        )}
        <li></li>
      </ul>
    </nav>
  );
}
