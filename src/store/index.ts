import { configureStore } from '@reduxjs/toolkit';
import {wishesReducer} from './reducers/wishesSlice';
import {filtersReducer} from './reducers/filtersSlice';

export const store = configureStore({
    reducer: {
        wishes: wishesReducer,
        filters: filtersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
