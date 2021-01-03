import axios from 'axios';
import { useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom'
import { Body, Header } from './components/layouts/main'
import { setCategory } from './components/redux/actions/categoryActions';
import { setMenu } from './components/redux/actions/menuActions';



function App() {
  const data = useSelector(state => state.menu)
  const dispatch = useDispatch()

  useEffect(() => {
    const getData = async () => {
      const menuItems = []
      const categoryItems = []
      const result = await axios.get('https://web-dokumen-app.herokuapp.com/categories')
      result.data.forEach(category => {
        categoryItems.push({
          id: category.id_category,
          name: category.name
        })
        category.menu.forEach(menu => {
          menuItems.push({
            category: category.name,
            ...menu
          })
        })
      });
      if (menuItems) {
        setTimeout(() => {
          dispatch(setMenu({
            isLoading: false,
            menu: menuItems
          }))
          dispatch(setCategory(categoryItems))
        }, 2000)
      }
    }
    getData()
  }, [dispatch])


  if (data.isLoading) {
    return (
      <div className='flex justify-center h-screen items-center flex-col'>
        <Loader
          type="TailSpin"
          color="#00BFFF"
          height={100}
          width={100}
        />
        <p className='text-blue-400 mt-2 text-2xl'>Loading ...</p>
      </div>
    )
  }


  return (
    <Router>
      <div>
        {/* Main */}
        <h1 className='text-3xl text-center text-white mt-5'>Kumpulan Dokumen</h1>
        <div className='bg-white mx-20 mt-12 rounded-sm'>
          <Header />
          <Body />
        </div>
      </div>
    </Router>
  );
}

export default App;