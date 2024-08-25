import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
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
      <FormControl isInvalid={hasErrors}>
        <FormLabel>Channel name</FormLabel>
        <Input
          type="text"
          value={data.name}
          onChange={handleChannelInput}
          placeholder="Channel name"
        />
        {hasErrors && errors?.name && (
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        )}
        <Button
          mt={4}
          colorScheme="blue"
          type="submit"
          disabled={data.name.length === 0}
          isLoading={processing}
        >
          Create
        </Button>
      </FormControl>
    </form>
  );
}
