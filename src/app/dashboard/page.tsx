import React from 'react'
import {fetchUsers} from '@/app/lib/data'
import { signOut } from '@/auth';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { authenticate } from '../lib/action';

const Dashboard = async () => {
  const users = await fetchUsers();
  return (
    <>
      <h1>Day la trang Dashboard</h1>   
      <form className='m-10' action={async () =>{
        "use server";
          await signOut();
      }}>
        <button>Sign out</button>
      </form>
      <Link href={'/dashboard/invoices'} className='m-10'> 
        <button>Invoices</button>
      </Link>
    </>
  )
}

export default Dashboard;