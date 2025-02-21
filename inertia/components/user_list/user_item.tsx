import { User } from '~/types';

export function UserItem({ user }: { user: User }) {
  return <li>{user.name}</li>;
}
