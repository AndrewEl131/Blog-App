import React from 'react'
import Image from 'next/image'

export default function loginPage() {
  return (
    <div className='h-screen'>
      <div className='w-[50vw] h-full border flex justify-center items-center'>
        <Image src={'/assets/Poster.png'} width={1100} height={1100} alt='poster' />
      </div>

      <div className='w-[50vw] h-full border'>
        <form>
          <div>
            email
          </div>
        </form>
      </div>
    </div>
  )
}
