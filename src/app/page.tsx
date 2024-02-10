import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <>
      <div>Day la TRANG INDEX</div>
      <span>Bam vao day de den trang Dashboard → </span>
      <Link href={'/dashboard'}> 
          <button className='border ml-5 p-1 rounded-lg'>DASHBOARD</button>
      </Link>
      <br/>
      <span>Tai khoan dang nhap : michael , pass:fgh  </span>

    </>
  )
}

export default page