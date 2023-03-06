import {useMemo} from 'react';
import {IWish} from '../models/IWish';
import {FiltersType, SortingType} from '../models/IFilters';

export const useFilteredWishes = (wishes: IWish[], filter: FiltersType) => useMemo(() => {
    switch (filter) {
        case FiltersType.ACTIVE:
            return wishes.filter((wish) => !wish.fulfilled);
        case FiltersType.FULFILLED:
            return wishes.filter((wish) => wish.fulfilled);
        case FiltersType.PRIORITY:
            return wishes.filter((wish) => wish.priority);
        default:
            return [...wishes].sort((a, b) => {
                if (a.order > b.order) return -1;
                return 1;
            });
    }
}, [wishes, filter]);

export const useSortedWishes = (wishes: IWish[], sorting: SortingType) => useMemo(() => {
    switch (sorting) {
        case SortingType.NAME:
            return [...wishes].sort((a, b) => a.name.localeCompare(b.name));
        case SortingType.FULFILLED:
            return [...wishes].sort((a, b) => {
                if (a.fulfilled && !b.fulfilled) return -1;
                if (!a.fulfilled && b.fulfilled) return 1;
                return 0;
            });
        case SortingType.PRIORITY:
            return [...wishes].sort((a, b) => {
                if (a.priority && !b.priority) return -1;
                if (!a.priority && b.priority) return 1;
                return 0;
            });
        default:
            return [...wishes].sort((a, b) => {
                if (a.order > b.order) return -1;
                return 1;
            });
    }
}, [wishes, sorting]);

export const useWishes = (wishes: IWish[], filter: FiltersType, sorting: SortingType) => {
    const filteredWishes = useFilteredWishes(wishes, filter);
    return useSortedWishes(filteredWishes, sorting);
};
