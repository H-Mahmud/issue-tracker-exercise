import { Skeleton } from '@/app/components';
import { Card, Flex, Heading } from '@radix-ui/themes';

export default function loading() {
  return (
    <Flex direction='column' gap='3'>
      <Heading>
        <Skeleton />
      </Heading>
      <Flex gap='3'>
        <Skeleton width='3rem' />
        <Skeleton width='5rem' />
      </Flex>

      <Card>
        <Skeleton count={5} />
      </Card>
    </Flex>
  );
}
