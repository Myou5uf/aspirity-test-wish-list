import React from 'react';
import './App.scss';
import WishList from '../WishList/WishList';
import {AddWish} from '../AddWish';
import {HeaderWishList} from '../HeaderWishList';

function App() {
    return (
        <div className="app">
            <div className='container'>
                <h1 className='app__title'>React Wish List</h1>
                <AddWish />
                <HeaderWishList />
                <WishList />
            </div>
        </div>
    );
}

export default App;
