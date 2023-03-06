import React, {useCallback} from 'react';
import './HeaderWishList.scss';
import {FilterWishes} from '../FilterWishes';
import {SortingWishes} from '../SortingWishes';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {clearWishList} from '../../store/reducers/wishesSlice';
import TrashIcon from '../ui/Icons/TrashIcon';
import {ToolTip} from '../ui/ToolTip';

function HeaderWishList() {
    const wishes = useAppSelector((state) => state.wishes.wishes);
    const dispatch = useAppDispatch();

    const handleClickClearWishList = useCallback(() => {
        // eslint-disable-next-line no-restricted-globals
        const isOk = confirm('Are you sure you want to clear your wish list?');
        if (isOk) {
            dispatch(clearWishList());
        }
    }, [dispatch]);

    if (wishes.length === 0) return null;

    return (
        <div className='headerWishList'>
            <FilterWishes />
            <div className='headerWishList__rect' />
            <div className='headerWishList__right'>
                <SortingWishes />
                <ToolTip text='Click if you want to delete all wishes'>
                    <button
                        type='button'
                        className='headerWishList__clearWishList-btn'
                        onClick={handleClickClearWishList}
                    >
                        <TrashIcon />
                    </button>
                </ToolTip>
            </div>
        </div>
    );
}

export default HeaderWishList;
