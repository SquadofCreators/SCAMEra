import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';

function StatCard({ title, value, icon, link }) {
  return (
    <div className='flex flex-col items-start justify-between border border-gray-400/20 rounded-lg shadow-lg'>
        <div className='w-full h-full flex items-start justify-between gap-6 p-6'>
            <div className='flex flex-col gap-2'>
                <h3 className='text-gray-400 text-xs tracking-wide font-semibold uppercase'>{title}</h3>
                <p className='text-white text-2xl font-bold'>{value}</p>
            </div>
            <div className='flex items-center justify-center h-full'>
                <p className='text-3xl text-blue-500'>
                    {icon}
                </p>
            </div>
        </div>
        <div className='w-full h-full flex items-center justify-between mt-4 border-t border-gray-400/20 px-6 py-3'>
            <Link 
                to={link}
                className='text-sm text-gray-400 flex items-center gap-2 hover:text-blue-500 transition-all duration-300'
            >
                View Details <MdKeyboardArrowRight className='text-xl'/> 
            </Link>
        </div>
    </div>
  )
}

export default StatCard