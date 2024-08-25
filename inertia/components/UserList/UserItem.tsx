import { User } from '~/types';

export default function UserItem({ user }: { user: User }) {
  return <li>{user.name}</li>;
}
