import { CreateUserBatch } from '@/app/lib/action';
import Link from 'next/link';
import React from 'react'

export const userBatch = [1,2,3];

const newUser = () => {
  return (
    <div className='m-10'>
    <div> Create User Batch </div>
    <form action={CreateUserBatch}>
      {userBatch.map(user => {
        return (         
          <div key={user}>
            <input type="text" placeholder={`username ${user}`} name={`name${user}`} />
            <input type="email" placeholder='email' name={`email${user}`} />
            <input type="password" placeholder='password' name={`password${user}`} />
          </div>
        )
      })} 
      <button className='border border-black p-2 inline-block mr-10'>Submit</button>
      <Link href={'/dashboard'}>
        <button className='border border-black p-2'>Cancel</button>
      </Link>
    </form>
    
    </div>
  )
}

export default newUser;