import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {
    const categories = useSelector(state => state.category)
    return (
        <div className='flex justify-evenly border-b border-black'>
            {categories.content.map((item) => (
                // <div id={item.id} key={item.id} className='inline text-xl m-2 cursor-pointer hover:text-indigo-600'
                //     onClick={() => dispatch(setSelectedCategory(item.name))}
                // >{item.name}</div>
                <Link id={item.id} key={item.id} to={item.name.toLowerCase()}
                    className='inline text-xl m-2 cursor-pointer hover:text-indigo-600'>{item.name}</Link>
            ))}
        </div>
    )
}

export default Header