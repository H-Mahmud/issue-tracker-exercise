'use client';

import { Button, Callout, CalloutRoot, TextFieldInput } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';

type IssueForm = {
  title: String;
  description: String;
};
export default function NewIssuePage() {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  const [error, setError] = useState('');
  return (
    <section className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-3'>
          <Callout.Icon>
            <MdErrorOutline />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', { ...data });
            router.push('/issues');
          } catch (error) {
            setError('An unexpected error encountered.');
          }
        })}
        className=' space-y-4'
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
