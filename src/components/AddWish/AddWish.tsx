import React, { useState} from 'react';
import './AddWish.scss';
import PlusIcon from '../ui/Icons/PlusIcon';
import {addWish} from '../../store/reducers/wishesSlice';
import {useAppDispatch} from '../../hooks/redux';

function AddWish() {
    const [value, setValue] = useState('');
    const dispatch = useAppDispatch();

    const handleClickAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (value.trim().length > 0) {
            dispatch(addWish(value));
            setValue('');
        }
    };

    return (
        <form className='addWish'>
            <input
                type='text'
                className='addWish__input'
                value={value}
                placeholder='Enter your wish and press Enter'
                onChange={(e) => setValue(e.target.value)}
            />

            <button type='submit' onClick={(e) => handleClickAdd(e)} className='addWish__btn'>
                <PlusIcon />
            </button>
        </form>
    );
}

export default AddWish;
