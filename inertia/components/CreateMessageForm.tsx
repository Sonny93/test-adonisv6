import { useForm } from '@inertiajs/react';
import { FormEvent, useMemo, type ChangeEvent } from 'react';
import useChannel from '~/hooks/useChannel';
import { makeRequest } from '~/lib/request.js';
import { Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react';

export default function CreateMessageForm() {
  const { channel } = useChannel();
  const { data, setData, reset, processing, errors, hasErrors } = useForm({
    content: '',
  });
  const isFormDisabled = useMemo(
    () => processing || data.content.length === 0,
    [processing, data]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    makeRequest({
      method: 'post',
      url: `/channels/${channel.id}/messages`,
      body: data,
    }).then(() => reset());
    reset();
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setData('content', target.value);
    makeRequest({
      method: 'post',
      url: `/channels/${channel.id}/typing`,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={hasErrors}>
        <Input
          type="text"
          onChange={handleInputChange}
          value={data.content}
          placeholder={`Your message in #${channel.name}`}
          maxLength={5000}
          autoFocus
        />
        {hasErrors && errors?.content && (
          <FormErrorMessage>{errors.content}</FormErrorMessage>
        )}
        <Button
          css={{ display: 'none' }}
          type="submit"
          disabled={isFormDisabled}
        >
          send
        </Button>
      </FormControl>
    </form>
  );
}
