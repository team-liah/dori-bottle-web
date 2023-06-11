import React, { useState } from 'react';
import * as Custom from '@/components/common/CustomStyledComponent';
import useModals from '@/hooks/useModals';
import LoginModal from '@/components/LoginModal';

interface IloginProps {}

//#region Styled Component

//#endregion

export default function Login(props: IloginProps) {
  const { openModal } = useModals();

  return (
    <div className="w-full h-screen flex flex-col justify-end items-center px-5 py-8">
      <Custom.Button onClick={() => openModal(<LoginModal />)}>로그인/회원가입</Custom.Button>
    </div>
  );
}
