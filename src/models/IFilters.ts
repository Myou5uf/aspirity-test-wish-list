export enum FiltersType {
    ALL = 'all',
    ACTIVE = 'active',
    FULFILLED = 'fulfilled',
    PRIORITY = 'priority',
}

export enum SortingType {
    DEFAULT = 'default',
    NAME = 'name',
    PRIORITY = 'priority',
    FULFILLED = 'fulfilled',
}

export interface Filter {
    name: FiltersType
}

export interface Sorting {
    name: SortingType
}

export interface FiltersState {
    filter: Filter;
    sorting: Sorting;
}
