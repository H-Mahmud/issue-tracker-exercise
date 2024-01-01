import {
  Box,
  Button,
  Section,
  TextArea,
  TextFieldInput,
} from '@radix-ui/themes';

export default function NewIssuePage() {
  return (
    <Section>
      <Box className='max-w-xl space-y-4'>
        <TextFieldInput placeholder='Title' />
        <TextArea placeholder='Description' />
        <Button>Submit New Issue</Button>
      </Box>
    </Section>
  );
}
