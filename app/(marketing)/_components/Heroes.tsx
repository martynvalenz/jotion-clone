import React from 'react'
import Image from 'next/image'

const Heroes = () => {
  return (
    <div className='flex flex-col items-center justify-center max-w-5xl'>
      <div className='flex items-center'>
        <div  className='relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]'>
          <Image 
            src='/hero.png' 
            alt="hero image" 
            layout='fill' 
            objectFit='contain' 
          />
        </div>
        <div className='relative h-[400px] w-[400px] hidden md:block'>
          <Image
            src='/hero.png'
            alt="hero image"
            layout='fill'
            objectFit='contain'
          />
        </div>
      </div>
    </div>
  )
}

export default Heroes