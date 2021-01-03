import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useDynamicRefs from 'use-dynamic-refs'
import { setStep } from '../../../redux/actions/stepAction'

const Menu = ({ data }) => {
    const [getRef, setRef] = useDynamicRefs()
    const detailSelected = useSelector(state => state.detail)
    const dispatch = useDispatch()

    const showHideDiv = (val) => {
        const ref = getRef(val)
        ref.current.classList.toggle('hidden')
    }
    const openDetail = async (id) => {
        dispatch(setStep({
            ...detailSelected, isLoading: true
        }))
        const result = await axios.get('https://web-dokumen-app.herokuapp.com/content/' + id)
        // console.log(result.data)
        dispatch(setStep({
            isLoading: false,
            ...result.data
        }))

    }
    return (
        <div className='bg-indigo-400 w-1/3 flex-row overflow-auto'>
            {data.map(item => (
                <div key={item.id_menu}>
                    <div onClick={() => showHideDiv(item.id_menu)}>
                        <div className='border border-black m-1 rounded h-10 bg-green-400 cursor-pointer'>
                            <p className='p-1 text-lg text-white'>{item.name}</p>
                        </div>
                    </div>
                    <div className='ml-4 mt-2 hidden' ref={setRef(item.id_menu)}>
                        {item.content.map(val => (
                            <div key={val.title} onClick={() => openDetail(val.id_content)}>
                                <p className='text-white cursor-pointer mt-2 hover:text-black'>{val.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Menu