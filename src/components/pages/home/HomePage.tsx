'use client';

import { useRouter } from 'next/navigation';

import { OPERATION_ROUTER } from '@/constants/router/router';

const HomePage = () => {
  const router = useRouter();
  router.push(`${OPERATION_ROUTER}/30`);
  return <div>HomePage</div>;
};

export default HomePage;
