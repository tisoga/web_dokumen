import React from 'react'

const AuthLogin = () => {
    return (
        <div className='flex flex-col items-center h-full mt-32'>
            <div className='flex flex-col bg-indigo-800 w-1/4'>
                <p className='p-1 text-2xl bg-white text-center text-black'>Login</p>
                <input placeholder='Username' className='bg-indigo-800 border mt-2 mx-2 p-2 rounded placeholder-white' />
                <input placeholder='Password' type={'password'} className='bg-indigo-800 border mt-2 mx-2 p-2 rounded placeholder-white' />
                <button className='border border-blue-400 p-2 mx-2 mt-2 rounded bg-blue-400 hover:bg-blue-700 hover:text-white'>Login</button>
                <div className='border my-3' />
                <button className='border border-blue-400 p-2 mx-2 mb-1 rounded bg-blue-600'>Login With Facebook</button>
                <button className='border border-red-600 p-2 mx-2 mb-1 rounded bg-red-600'>Login With Google</button>
            </div>
        </div>
    )
}

export default AuthLogin