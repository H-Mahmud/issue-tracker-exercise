'use client';

import { Button, TextFieldInput } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

type IssueForm = {
  title: String;
  description: String;
};
export default function NewIssuePage() {
  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <section>
      <form
        onSubmit={handleSubmit(async (data) => {
          axios.post('/api/issues', { ...data });
        })}
        className='max-w-xl space-y-4'
      >
        <TextFieldInput placeholder='Title' {...register('title')} />
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='description' {...field} />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
    </section>
  );
}
