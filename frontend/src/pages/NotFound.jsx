import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='h-dvh flex flex-col items-center justify-center gap-12 select-none '>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-8xl md:text-9xl font-bold text-yellow-500'>404</h1>
        <p>Page not found</p>
      </div>

      <div>
        <Link
          to='/'
          className='text-blue-500 underline md:no-underline hover:underline'
        >
          Go back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound