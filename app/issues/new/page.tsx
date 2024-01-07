'use client';

import { Button, Callout, Text, TextFieldInput } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { createIssueSchema } from '@/app/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Spinner } from '@/app/components';

type IssueForm = z.infer<typeof createIssueSchema>;
export default function NewIssuePage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post('/api/issues', { ...data });
      router.push('/issues');
      setIsSubmitting(false);
    } catch (error) {
      setError('An unexpected error encountered.');
      setIsSubmitting(false);
    }
  });

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
      <form onSubmit={onSubmit} className=' space-y-4'>
        <TextFieldInput placeholder='Title' {...register('title')} />
        <Text color='red' as='p'>
          {errors.title?.message}
        </Text>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='description' {...field} />
          )}
        />
        <Text color='red' as='p'>
          {errors.description?.message}
        </Text>

        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </section>
  );
}
