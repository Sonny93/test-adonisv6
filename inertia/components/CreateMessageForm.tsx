import useChannel from '@/hooks/useChannel'
import { useForm } from '@inertiajs/react'
import { useCallback, useMemo, type ChangeEvent } from 'react'
import Button from './Form/Button.js'
import TextField from './Form/TextField.js'

export default function CreateMessageForm() {
  const { channel } = useChannel()
  const { data, setData, reset, processing, errors } = useForm({
    content: '',
  })
  const isFormDisabled = useMemo(() => processing || data.content.length === 0, [processing, data])

  const makeRequest = async ({
    url,
    headers,
    body,
    method = 'GET',
  }: Omit<RequestInit, 'body'> & { url: string; body?: any }) => {
    return await fetch(url, {
      method,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  }

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault()
      await makeRequest({
        method: 'post',
        url: `/channels/${channel.id}/messages`,
        body: data,
      })
      reset()
    },
    [data]
  )

  const handleInputChange = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    setData('content', target.value)
    await makeRequest({
      method: 'post',
      url: `/channels/${channel.id}/typing`,
    })
  }

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
        onChange={handleInputChange}
        value={data.content}
        placeholder={`Your message in #${channel.name}`}
        maxLength={5000}
        autoFocus
      />
      {errors.content && <div>{errors.content}</div>}
      <Button css={{ display: 'none' }} type="submit" disabled={isFormDisabled}>
        send
      </Button>
    </form>
  )
}
