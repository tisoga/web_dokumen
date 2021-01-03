import React, { useState } from 'react'
import useDynamicRefs from 'use-dynamic-refs'
import firebase from '../../../firebase'
const AddDokumen = () => {
    const [getRef, setRef] = useDynamicRefs();
    const [isJudul, setJudul] = useState(false)
    const [selectCategory, setCategory] = useState({})
    const [dataTitle, setDataTitle] = useState({
        0: {
            title: '',
            explain: '',
            type: ''
        }
    })
    const [data, setData] = useState({
        count: 1,
        menu: 'django',
        documentId: '',
        documentName: '',
        category: 'Web',
        steps: []
    })

    const pilihPenjelasan = (id) => {
        const ref = getRef('explain_' + id)
        const urlRef = getRef('url_' + id)
        if (dataTitle[id].title) {
            if (selectCategory[id]) {
                urlRef.current.classList.toggle('hidden')
                ref.current.classList.add('hidden')
            }
            else {
                ref.current.classList.toggle('hidden')
            }
        }
        else {
            alert('Harap Isi Terlebih dahulu stepnya.')
        }

    }

    const showExplain = (val, id) => {
        let ref = ''
        const pilihRef = getRef('explain_' + id)
        setDataTitle({
            ...dataTitle, [id]: {
                ...dataTitle[id], type: val[id]
            }
        })
        if (val[id] === 'url') {
            ref = getRef('url_' + id)
        }
        else {
            ref = getRef('code_' + id)
        }
        ref.current.classList.toggle('hidden')
        pilihRef.current.classList.toggle('hidden')
    }

    const tambahStep = () => {
        setData({ ...data, count: data.count + 1 })
        setDataTitle({
            ...dataTitle, [data.count]: {
                title: '',
                explain: '',
                type: ''
            }
        })
    }

    const addDokumen = () => {
        const menuRef = firebase.firestore().collection('menu').doc('msy29vqa1KUzHhLswvkd').collection('content')
        menuRef.add({
            name: data.documentName
        }).then(docRef => {
            setData({
                ...data,
                documentId: docRef.id
            })
            setJudul(true)
        })

    }

    const saveDokumen = () => {
        const stepsRef = firebase.firestore().collection('steps')
        stepsRef.add({
            content_id: data.documentId,
            name: data.documentName
        }).then(ref => {
            const stepRef = stepsRef.doc(ref.id).collection('step')
            for (let i = 0; i < data.count; i++) {
                stepRef.doc(String(i)).set({
                    title: data.steps[i].title,
                    explain: data.steps[i].explain ? data.steps[i].explain : '',
                    type: data.steps[i].type ? data.steps[i].type : ''
                })
            }
        })
    }

    const saveSteps = () => {
        const step = []
        for (let i = 0; i < data.count; i++) {
            step.push({
                title: dataTitle[i].title,
                explain: dataTitle[i].explain,
                type: dataTitle[i].type
            })
        }
        setTimeout(() => {
            setData({
                ...data, steps: step
            })
            console.log('s')
        }, 3000)
    }

    const steps = []
    for (let i = 0; i < data.count; i++) {
        steps.push(
            <div key={i}>
                <div className='flex flex-row w-full'>
                    <input className='bg-white-800 border mt-2 mx-3 p-2 rounded placeholder-black w-9/12'
                        disabled={!isJudul} onChange={(val) => {
                            setDataTitle({
                                ...dataTitle, [i]: {
                                    title: val.target.value,
                                }
                            })
                        }} />
                    <button className='border p-2 rounded bg-blue-400 text-black hover:bg-blue-800 hover:text-white mt-2'
                        disabled={!isJudul} onClick={() => pilihPenjelasan(i)}>Add Explaination</button>
                </div>
                <div ref={setRef('url_' + i)} className='flex flex-row w-full hidden'>
                    <input placeholder='Masukan URL' className='bg-gray-400 border mt-2 ml-12 mr-2 p-1 rounded placeholder-black w-9/12'
                        onChange={(val) => setDataTitle({
                            ...dataTitle, [i]: {
                                ...dataTitle[i], explain: val.target.value
                            }
                        })} />
                    {/* <button className='border p-2 rounded bg-blue-400 text-black hover:bg-blue-800 hover:text-white mt-2 w w-2/12'>Save</button> */}
                </div>
                <div ref={setRef('code_' + i)} className='flex flex-row w-full hidden'>
                    <textarea placeholder='Masukan Coding' className='bg-gray-400 border mt-2 ml-12 mr-2 p-1 rounded placeholder-black w-9/12'
                        onChange={(val) => setDataTitle({
                            ...dataTitle, [i]: {
                                ...dataTitle[i], explain: val.target.value
                            }
                        })}></textarea>
                    <button className='border p-2 rounded bg-blue-400 text-black hover:bg-blue-800 hover:text-white mt-2 w w-2/12'>Save</button>
                </div>
                <div ref={setRef('explain_' + i)} className='flex flex-row items-center hidden'>
                    <h3 className='text-white text-xl mx-2 mt-1'>Silahkan Pilih Tipe Penjelasan</h3>
                    <select className="bg-white border border-gray-400 px-2 py-2 rounded mt-1 w-1/3"
                        defaultValue={''} onChange={(val) => setCategory({
                            ...selectCategory, [i]: val.target.value
                        })}>
                        <option value={''} disabled={true}>Silahkan Pilih</option>
                        <option value={'url'}>URL</option>
                        <option value={'code'}>Coding</option>
                    </select>
                    <button className='border p-2 rounded bg-blue-400 text-black hover:bg-blue-800 hover:text-white mt-1 ml-1 w-1/4'
                        onClick={() => showExplain(selectCategory, i)}>Add</button>
                </div>
            </div>
        )
    }
    return (
        <div className='flex flex-col h-screen items-center'>
            <div className='bg-white mt-12 rounded-sm w-1/2'>
                <h1 className='text-3xl text-center'>Add Document</h1>
                <div className='bg-indigo-800 flex flex-col'>
                    <h3 className='text-white text-xl mx-2 mt-1'>Judul Dokumen</h3>
                    <div className='flex-row border-b-2'>
                        <input placeholder='Judul Dokumen' className='bg-white-800 border mt-2 mx-3 p-2 rounded placeholder-black w-3/4'
                            onChange={(val) => setData({
                                ...data, documentName: val.target.value
                            })} />
                        <button className='border p-2 rounded bg-blue-400 text-black hover:bg-blue-800 hover:text-white w-1/5 mb-2'
                            onClick={() => addDokumen()}>Add</button>
                    </div>
                    <h3 className='text-white text-xl mx-2 mt-1'>Step by Step</h3>
                    <div className='flex flex-col border-b-2 pb-2'>
                        {steps}
                        <button className='border p-2 rounded bg-green-800 text-white hover:bg-blue-400 hover:text-black mt-1 ml-1'
                        onClick={() => saveSteps()}>Save</button>
                    </div>
                    <div className='flex flex-row justify-center border-b-2 pb-2'>
                        <button className='border p-2 rounded bg-red-800 text-white hover:bg-blue-800 hover:text-white mt-1 ml-1 w-1/4'
                            disabled={!isJudul} onClick={tambahStep}>Add New Step</button>
                        <button className='border p-2 rounded bg-green-400 text-black hover:bg-blue-800 hover:text-white mt-1 ml-1 w-1/4'
                            disabled={!isJudul} onClick={saveDokumen}>Save Dokumen</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDokumen