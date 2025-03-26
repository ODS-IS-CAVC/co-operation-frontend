import { redirect } from 'next/navigation';

import HomePage from '@/components/pages/home/HomePage';
import { OPERATION_ROUTER } from '@/constants/router/router';

export default function Home() {
  redirect(`${OPERATION_ROUTER}/30`);
  return <HomePage />;
}
