import React from 'react'
import footimg from '@/assets/footimg.png'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className='flex justify-center mt-5'>
  
        <Image  src={footimg} alt="footer" className="w-full" />
    </div>
  )
}

export default Footer
