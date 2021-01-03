import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Content from './Content'
import Menu from './Menu'

const Main = () => {
    const menuData = useSelector(state => state.menu).menu
    const categories = useSelector(state => state.category).content
    return (
        <div className='flex' style={{ height: 400 }}>
            {/* <Menu data={menu} /> */}
            <Switch>
                {categories.map(item => (
                    <Route key={item.id} path={`/${item.name.toLowerCase()}`}>
                        <Menu data={menuData.filter(menuItem => {
                            return menuItem.category === item.name
                        })} />
                    </Route>
                ))}
            </Switch>
            <Content />
        </div>
    )
}

export default Main