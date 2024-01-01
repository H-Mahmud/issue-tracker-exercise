'use client';

import { Box, Button, TextFieldInput } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

export default function NewIssuePage() {
  return (
    <section>
      <Box className='max-w-xl space-y-4'>
        <TextFieldInput placeholder='Title' />
        <SimpleMDE />
        <Button>Submit New Issue</Button>
      </Box>
    </section>
  );
}
