import { useForm } from '@inertiajs/react';
import { Button, TextInput } from '@mantine/core';
import { ChangeEvent, FormEvent } from 'react';

export default function CreateChannelForm() {
  const { data, setData, post, processing, errors, hasErrors } = useForm({
    name: '',
  });

  const handleChannelInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setData('name', target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post('/channels');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Channel name"
        type="text"
        value={data.name}
        onChange={handleChannelInput}
        placeholder="Channel name"
        error={hasErrors && errors?.name}
      />
      <Button
        mt="md"
        type="submit"
        disabled={data.name.length === 0}
        loading={processing}
      >
        Create
      </Button>
    </form>
  );
}
