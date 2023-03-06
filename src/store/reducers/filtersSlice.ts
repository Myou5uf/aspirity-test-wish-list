import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Filter, FiltersState, FiltersType, Sorting, SortingType} from '../../models/IFilters';

const initialState: FiltersState = {
    filter: {name: FiltersType.ALL},
    sorting: {name: SortingType.DEFAULT},
};

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        changeFilter(state, action: PayloadAction<Filter>) {
            state.filter.name = action.payload.name;
        },
        changeSorting(state, action: PayloadAction<Sorting>) {
            state.sorting.name = action.payload.name;
        },
    },
});

export const {changeFilter, changeSorting} = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
