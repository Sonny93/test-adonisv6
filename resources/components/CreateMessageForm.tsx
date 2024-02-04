import useChannel from '@/hooks/useChannel'
import { useForm } from '@inertiajs/react'
import { useCallback, useMemo } from 'react'
import Button from './Form/Button'
import TextField from './Form/TextField'

export default function CreateMessageForm() {
  const { channel } = useChannel()
  const { data, setData, reset, processing, errors } = useForm({
    content: '',
  })
  const isFormDisabled = useMemo(() => processing || data.content.length === 0, [processing, data])

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault()
      await fetch(`/channels/${channel.id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      reset()
    },
    [data]
  )

  return (
    <form
      onSubmit={handleSubmit}
      css={{
        display: 'flex',
        gap: '.35em',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TextField
        type="text"
        onChange={(e) => setData('content', e.target.value)}
        value={data.content}
        placeholder="Your message"
        maxLength={5000}
        autoFocus
      />
      {errors.content && <div>{errors.content}</div>}
      <Button type="submit" disabled={isFormDisabled}>
        send
      </Button>
    </form>
  )
}
