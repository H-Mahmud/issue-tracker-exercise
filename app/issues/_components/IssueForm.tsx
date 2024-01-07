'use client';

import { Spinner } from '@/app/components';
import { issueSchema } from '@/app/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, Text, TextFieldInput } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MdErrorOutline } from 'react-icons/md';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueSchema>;
const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    try {
      if (issue) {
        await axios.patch('/api/issues/' + issue.id, { ...data });
        router.push('/issues/' + issue.id);
      } else {
        await axios.post('/api/issues', { ...data });
        router.push('/issues');
      }
      router.refresh();
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
        <TextFieldInput
          defaultValue={issue?.title}
          placeholder='Title'
          {...register('title')}
        />
        <Text color='red' as='p'>
          {errors.title?.message}
        </Text>
        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder='description' {...field} />
          )}
        />
        <Text color='red' as='p'>
          {errors.description?.message}
        </Text>

        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </section>
  );
};

export default IssueForm;
