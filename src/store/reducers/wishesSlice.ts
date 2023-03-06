import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';
import {DragAndDropPayload, IWish, UpdatePayload, WishListState} from '../../models/IWish';

const LOCAL_STORAGE_WISHES_KEY = 'LOCAL_STORAGE_WISHES_KEY';
const COUNT_WISHES = 'COUNT_WISHES';

const initialState: WishListState = {
    wishes: JSON.parse(localStorage.getItem(LOCAL_STORAGE_WISHES_KEY) || '[]'),
    count: Number(localStorage.getItem(COUNT_WISHES)) || 0,
};

export const wishesSlice = createSlice({
    name: 'wishes',
    initialState,
    reducers: {
        addWish(state, action: PayloadAction<string>) {
            state.count += 1;
            const wish: IWish = {
                id: uuidv4(),
                name: action.payload,
                fulfilled: false,
                priority: false,
                order: state.count, // TODO Разобраться со счетчиком, т.к при обновлении стр, счетчик сбрасывается
            };
            state.wishes.push(wish);
            localStorage.setItem(LOCAL_STORAGE_WISHES_KEY, JSON.stringify(state.wishes));
            localStorage.setItem(COUNT_WISHES, JSON.stringify(state.count));
        },
        updateNameWish(state, action: PayloadAction<UpdatePayload>) {
            const foundIndexWish = state.wishes.findIndex((wish) => wish.id === action.payload.id);
            state.wishes[foundIndexWish].name = action.payload.name;
            localStorage.setItem(LOCAL_STORAGE_WISHES_KEY, JSON.stringify(state.wishes));
        },
        deleteWish(state, action: PayloadAction<string>) {
            state.wishes = state.wishes.filter((wish) => wish.id !== action.payload);
            state.count -= 1;
            localStorage.setItem(LOCAL_STORAGE_WISHES_KEY, JSON.stringify(state.wishes));
            localStorage.setItem(COUNT_WISHES, JSON.stringify(state.count));
        },
        fulfillWish(state, action: PayloadAction<string>) {
            const foundIndexWish = state.wishes.findIndex((wish) => wish.id === action.payload);
            state.wishes[foundIndexWish].fulfilled = !state.wishes[foundIndexWish].fulfilled;
            localStorage.setItem(LOCAL_STORAGE_WISHES_KEY, JSON.stringify(state.wishes));
        },
        addPriorityWish(state, action: PayloadAction<string>) {
            const foundIndexWish = state.wishes.findIndex((wish) => wish.id === action.payload);
            state.wishes[foundIndexWish].priority = !state.wishes[foundIndexWish].priority;
            localStorage.setItem(LOCAL_STORAGE_WISHES_KEY, JSON.stringify(state.wishes));
        },
        clearWishList(state) {
            state.wishes = [];
            state.count = 0;
            localStorage.removeItem(LOCAL_STORAGE_WISHES_KEY);
            localStorage.removeItem(COUNT_WISHES);
        },
        changeWishPosition(state, action: PayloadAction<DragAndDropPayload>) {
            state.wishes = state.wishes.map((wish) => {
                const currentWish = action.payload.currentWish;
                const lastWish = action.payload.lastWish;
                if (wish.id === lastWish.id) {
                    return {...wish, order: currentWish.order};
                }
                if (wish.id === currentWish.id) {
                    return {...wish, order: lastWish.order};
                }
                return wish;
            });
            state.wishes = state.wishes.sort((a, b) => {
                if (a.order > b.order) return -1;
                return 1;
            });
            localStorage.setItem(LOCAL_STORAGE_WISHES_KEY, JSON.stringify(state.wishes));
        },
    },
});

export const {
    addWish,
    updateNameWish,
    deleteWish,
    fulfillWish,
    addPriorityWish,
    changeWishPosition,
    clearWishList,
} = wishesSlice.actions;

export const wishesReducer = wishesSlice.reducer;
