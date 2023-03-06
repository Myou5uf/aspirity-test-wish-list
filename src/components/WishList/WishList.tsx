import React, {useCallback, useState} from 'react';
import './WishList.scss';
import {WishItem} from '../WishItem';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {useWishes} from '../../hooks/wishes';
import {IWish} from '../../models/IWish';
import {changeWishPosition} from '../../store/reducers/wishesSlice';
import {FiltersType} from '../../models/IFilters';
import {Message} from '../Message';

function WishList() {
    const {wishes} = useAppSelector((state) => state.wishes);
    const dispatch = useAppDispatch();
    const {filter, sorting} = useAppSelector((state) => state.filters);
    const filteredAndSortedWishes = useWishes(wishes, filter.name, sorting.name);
    const [currentWish, setCurrentWish] = useState<IWish>();

    const dragStartHandler = useCallback((e: React.DragEvent<HTMLLIElement>, wish: IWish) => {
        const currentTarget = e.currentTarget as HTMLLIElement;
        currentTarget.style.opacity = '0.5';
        setCurrentWish(wish);
    }, []);

    const dragEndHandler = useCallback((e: React.DragEvent<HTMLLIElement>) => {
        const currentTarget = e.currentTarget as HTMLLIElement;
        currentTarget.style.opacity = '1';
    }, []);

    const dragOverHandler = useCallback((e: React.DragEvent<HTMLLIElement>) => {
        e.preventDefault();
        const currentTarget = e.currentTarget as HTMLLIElement;
        currentTarget.style.opacity = '0.5';
    }, []);

    const dropHandler = useCallback((e: React.DragEvent<HTMLLIElement>, wish: IWish) => {
        e.preventDefault();
        if (currentWish) {
            dispatch(changeWishPosition({currentWish, lastWish: wish}));
        }
        const currentTarget = e.currentTarget as HTMLLIElement;
        currentTarget.style.opacity = '1';
    }, [currentWish, dispatch]);

    if (!filteredAndSortedWishes.length) {
        switch (filter.name) {
            case FiltersType.ACTIVE:
                return <Message text='The list of active wishes is empty' />;
            case FiltersType.FULFILLED:
                return <Message text='The list of fulfilled wishes is empty(((' />;
            case FiltersType.PRIORITY:
                return <Message text='The list of priority wishes is empty' />;
            default:
                return <Message text='The wish list is still empty(((' />;
        }
    }

    return (
        <ul className='wishList'>
            {filteredAndSortedWishes.map((wish) => (
                <WishItem
                    key={wish.id}
                    wish={wish}
                    dragStartHandler={dragStartHandler}
                    dragEndHandler={dragEndHandler}
                    dragOverHandler={dragOverHandler}
                    dropHandler={dropHandler}
                />
            ))}
        </ul>
    );
}

export default WishList;
