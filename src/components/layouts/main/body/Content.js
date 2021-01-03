import React from 'react'
import Loader from 'react-loader-spinner'
import { useSelector } from 'react-redux'

const Content = () => {
    const detail = useSelector(state => state.detail)
    return (
        <div className='bg-indigo-800 w-full overflow-auto'>
            {detail.isLoading
                ?
                <div className='flex h-full items-center flex-col justify-center'>
                    <Loader
                        type="TailSpin"
                        color="#FFFFFF"
                        height={60}
                        width={60}
                    />
                    <p className='text-white mt-2 text-md'>Please Wait ...</p>
                </div>
                :
                <div>
                    <h2 className='text-center text-3xl text-white'>{detail.title}</h2>
                    <div className='flex-row'>
                        {detail.steps.map((step, index) => (
                            <div key={step.id}>
                                <div className='text-2xl bg-white m-2 rounded p-2'>{(index + 1) + ". " + step.title}</div>
                                {step.type === 'Url'
                                    ?
                                    
                                        <div className='text-lg bg-gray-400 italic mx-2 rounded px-1' dangerouslySetInnerHTML={{__html: step.explain}}>
                                            
                                        </div>
                                    
                                    :
                                    <div className='text-lg bg-gray-400 italic mx-2 rounded px-1 whitespace-normal overflow-x-auto'
                                        // onClick={() => { navigator.clipboard.writeText(step.explain) }}
                                        dangerouslySetInnerHTML={{__html: step.explain}}
                                    />
                                    
                                }
                            </div>
                        ))}
                    </div>
                </div>
            }


        </div >
    )
}

export default Content