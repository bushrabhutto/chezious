import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Card = ({ img ,txt}) => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
      <Link href="#">
        <Image className="p-8 rounded-t-lg" src={img} alt="product image" />
      </Link>
      <div className="px-5 pb-5">
    
          <h4 className="text-xl font-bold tracking-tight text-black-500">
           {txt}
          </h4>
     
       
    
      </div>
    </div>
  );
};

export default Card;
