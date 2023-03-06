import React from 'react';
import './FilterWishes.scss';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {changeFilter} from '../../store/reducers/filtersSlice';
import {Filter, FiltersType} from '../../models/IFilters';

const filtersNames: Filter[] = [
    {name: FiltersType.ALL},
    {name: FiltersType.ACTIVE},
    {name: FiltersType.FULFILLED},
    {name: FiltersType.PRIORITY},
];

function FilterWishes() {
    const filter = useAppSelector(state => state.filters.filter);
    const dispatch = useAppDispatch();

    return (
        <div className='filterWishes'>
            {filtersNames.map((filterName) => (
                <button
                    type='button'
                    key={filterName.name}
                    className={filterName.name === filter.name ? 'filterWishes__btn filterWishes__btn_active' : 'filterWishes__btn'}
                    onClick={() => dispatch(changeFilter({name: filterName.name}))}
                >
                    {filterName.name}
                </button>

            ))}
        </div>
    );
}

export default React.memo(FilterWishes);
