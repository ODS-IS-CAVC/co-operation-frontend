import { Suspense } from 'react';

import Loading from '@/components/common/Loading';
import HomePage from '@/components/pages/operation/dev/HomePage';

export default async function OperationPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  return (
    <Suspense fallback={<Loading />}>
      <HomePage id={id} />
    </Suspense>
  );
}
