import { useForm } from '@inertiajs/react'
import { useCallback, useMemo } from 'react'

export default function CreateMessageForm({ channelId }: { channelId: Channel['id'] }) {
  const { data, setData, reset, processing, errors } = useForm({
    content: '',
  })
  const isFormDisabled = useMemo(() => processing || data.content.length === 0, [processing, data])

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault()
      await fetch(`/channels/${channelId}/messages`, {
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
      <input
        type="text"
        onChange={(e) => setData('content', e.target.value)}
        value={data.content}
        placeholder="Your message"
        css={{
          width: '100%',
          border: '1px solid #888',
          padding: '.6em',
        }}
        max={5000}
        autoFocus
      />
      {errors.content && <div>{errors.content}</div>}
      <button type="submit" css={{ padding: '.5em .75em' }} disabled={isFormDisabled}>
        send
      </button>
    </form>
  )
}
