import React from 'react'
import CreatePostForm from './CreatePostForm'

export default function page() {
  return (
    <main className='h-[85vh] flex md:flex-row flex-col justify-center items-center'>
        <CreatePostForm />
    </main>
  )
}
