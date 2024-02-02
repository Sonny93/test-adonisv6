export default function UserItem({ user }: { user: User }) {
  return (
    <li>
      ({user.uid}) {user.username}
    </li>
  )
}
