import { useForm } from '@inertiajs/react';
import { useMemo } from 'react';

export default function CreateChannelForm() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
  });
  const isFormDisabled = useMemo(
    () => processing || data.name.length === 0,
    [processing, data]
  );

  function submit(e) {
    e.preventDefault();
    post('/channels');
  }

  return (
    <form onSubmit={submit}>
      <h2>create channel</h2>
      <input
        type="text"
        value={data.name}
        onChange={(e) => setData('name', e.target.value)}
      />
      {errors.name && <div>{errors.name}</div>}
      <button type="submit" disabled={isFormDisabled}>
        create
      </button>
    </form>
  );
}
