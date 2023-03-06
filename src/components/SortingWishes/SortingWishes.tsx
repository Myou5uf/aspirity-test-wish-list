import React from 'react';
import './SortingWishes.scss';
import {changeSorting} from '../../store/reducers/filtersSlice';
import {Sorting, SortingType} from '../../models/IFilters';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {ToolTip} from '../ui/ToolTip';

const sortingNames: Sorting[] = [
    {name: SortingType.DEFAULT},
    {name: SortingType.NAME},
    {name: SortingType.FULFILLED},
    {name: SortingType.PRIORITY},
];

function SortingWishes() {
    const sorting = useAppSelector(state => state.filters.sorting);
    const dispatch = useAppDispatch();

    return (
        <ToolTip text='Choose which field to sort the wish list by'>
            <select
                className='sortingWishes'
                value={sorting.name}
                onChange={(e) => dispatch(changeSorting({name: e.target.value as SortingType}))}
            >
                {sortingNames.map((sort) => <option key={sort.name} value={sort.name}>{sort.name}</option>)}
            </select>
        </ToolTip>
    );
}

export default React.memo(SortingWishes);
