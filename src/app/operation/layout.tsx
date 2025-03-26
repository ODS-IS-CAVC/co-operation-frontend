'use client';
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import React, { useEffect } from 'react';

import { Logo } from '@/components/common/Logo';
import { useAppDispatch } from '@/hook/useRedux';
import { actions } from '@/redux';
import { negotiationCarrierService } from '@/services/carrier/negotiation';

export default function OperationLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    negotiationCarrierService()
      .getPrefectures()
      .then((response) => {
        dispatch(actions.appAction.setLocations(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='relative flex flex-col max-w-screen-xl min-w-96 mx-auto'>
      <Navbar className='bg-white border-b border-primary h-[5.5rem]' isBordered isBlurred={false} maxWidth='2xl'>
        <NavbarContent justify='center'>
          <NavbarBrand>
            <Logo />
            <p className='font-normal text-gray-500 text-3xl'>運行スケジュール</p>
          </NavbarBrand>
        </NavbarContent>
      </Navbar>
      <main className='light py-4 tl:flex'>{children}</main>
    </div>
  );
}
