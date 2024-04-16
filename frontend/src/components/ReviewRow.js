import React from 'react'
import { FaStar } from 'react-icons/fa'

function ReviewRow({items}) {
  return (
    <div>
        <div className=' w-[78vw]  ml-[8vw]  cursor-pointer my-8   px-3 md:px-6 mx-auto gap-4 md:gap-8'>
        <div>
        <h1 className='text-white py-2 text-2xl md:text-3xl font-bold'>{items?.name}</h1>
        <div className='flex gap-2 my-3'>
        {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={index < items.rating ? 'text-green-500 cursor-pointer text-xl' : 'text-gray-400 text-xl cursor-pointer'}
                      />
                    ))}
        </div>
        <p className='text-white py-2 text-sm md:text-md'>{items?.review}</p>
        
        </div>
        
        
    </div>
    <div className='h-[2px] bg-gray-500 w-[78%] ml-[8%]'></div>
    </div>
  )
}

export default ReviewRow