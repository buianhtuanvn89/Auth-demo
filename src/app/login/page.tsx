'use client'

import React, { useState } from 'react'
import { authenticate } from '../lib/action'
import { useFormState } from 'react-dom';
import Link from 'next/link';

const login = () => {
  const [ErrorMessage,dispatch] = useFormState(authenticate,undefined);

  return (
    <div>
        <p className='m-12 border border-black text-3xl w-25 text-center'> SIGNIN </p>
        <form action={dispatch} className='m-10'>
            <input className ="border m-2" type="text" placeholder='Nhap ten' name='username'/>
            <input className ="border m-2" type="password" placeholder='Nhap pass' name='password'/>
            <button className='border p-1 border-black rounded-lg'>Login</button>
        </form>
        {ErrorMessage && (
          <>
            <p className='text-red-500 m-12'>{ErrorMessage}</p>
          </>
        )}
        <span>Ve trang Index → </span> 
        <Link href={'/'}> 
          <button className='border ml-5 p-1 rounded-lg'>INDEX</button>
        </Link>
    </div>
  )
}

export default login