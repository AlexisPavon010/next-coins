import React from 'react'

export default function StatusCard({color, amount, icon, title, percentageIcon, percentage, percentageColor, date}) {
    return (
        <div className="px-4 mb-10">
        <div className='w-full bg-white rounded-xl overflow-hdden shadow-md p-4 cardbackground'>
            <div className="flex flex-wrap border-b border-gray-200">
                <div className={`bg-gradient-to-tr from-${color}-500 to-${color}-700 -mt-10 rounded-xl text-white grid items-center w-24 h-24 py-4 px-4 justify-center shadow-lg-pink mb-0`}>
                    <span className="material-icons text-white text-3xl leading-none">{icon}</span>
                </div>
                <div className='w-full pl-4 max-w-full flex-grow flex-1 mb-2 text-right text-white"'>
                    <h5 className='text-gray-600 font-light tracking-wide text-base mb-1'>{title}</h5>
                    <span className="text-3xl text-gray-200">{amount}</span>
                </div>
            </div>
            <div className="text-sm text-gray-700 pt-4 flex items-center">
                <span className={`material-icons text-${percentageColor}-500 text-base leading-none`}>{percentageIcon}</span>
                <span className={`text-${percentageColor}-500 ml-1 mr-2`}>{percentage}</span>
                <span className="font-light whitespace-nowrap">{date}</span>
            </div>
        </div>
    </div>
    )
}
