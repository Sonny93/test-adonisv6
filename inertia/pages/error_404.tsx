import { Link } from '@inertiajs/react'

export default function Error404() {
  return (
    <div>
      <h1>Oups | Page introuvable</h1>
      <p>La page est introuvable</p>
      <Link href="/">revenir à l'accueil</Link>
    </div>
  )
}
