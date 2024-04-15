import { useForm } from '@inertiajs/react'
import { useMemo } from 'react'
import Button from './Form/Button.js'
import TextField from './Form/TextField.js'

export default function CreateChannelForm() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
  })
  const isFormDisabled = useMemo(() => processing || data.name.length === 0, [processing, data])

  function submit(e) {
    e.preventDefault()
    post('/channels')
  }

  return (
    <form
      onSubmit={submit}
      css={{
        display: 'flex',
        gap: '.35em',
        flexDirection: 'column',
      }}
    >
      <TextField
        type="text"
        value={data.name}
        onChange={(e) => setData('name', e.target.value)}
        placeholder="New channel"
      />
      {errors.name && <div>{errors.name}</div>}
      <Button type="submit" disabled={isFormDisabled}>
        Create
      </Button>
    </form>
  )
}
