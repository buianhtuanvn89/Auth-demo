import React from 'react'
import {fetchUsers} from '@/app/lib/data'
import { signOut } from '@/auth';
import Link from 'next/link';
import { DeleteUser } from '../lib/action';

const Dashboard = async () => {
  const users = await fetchUsers();
  // console.log(users);
  return (
    <>
      <p className='m-10 text-2xl'>Day la trang Dashboard</p>  
      {/* Tao nut Sign Out */}
      <form className='mb-5 ml-20 inline-block' action={async () =>{
        "use server";
          await signOut();
      }}>
        <button className='border border-black p-2'>Sign out</button>
      </form>

      {/* Tao nut Create User */}
      <Link href={'/dashboard/newUser'} className='mb-5 ml-20'> 
        <button className='border border-black p-2'>Create User</button>
      </Link>

      {/* Tao Danh sach User */}
      <p className='ml-20  text-xl' >Danh sach user</p>
      {users.map(user => {
          const deleteUsersId = DeleteUser.bind(null,user._id)
          return (
          <div key={user.username} className='ml-20 mt-5'>
            <span className='pr-5'>Username: {user.username}</span>
            <span className='pr-5'>email: {user.email}</span>
            <span className='pr-5'>password: {user.password}</span>
            <form action={deleteUsersId}>
              <button className='border border-black p-2'>Delete this user</button>
            </form>
          </div>
      )})}
    </>
  )
}

export default Dashboard;