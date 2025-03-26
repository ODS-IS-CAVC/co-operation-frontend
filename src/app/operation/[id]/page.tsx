import HomePage from '@/components/pages/operation/HomePage';

export default async function OperationPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  return <HomePage id={id} />;
}
