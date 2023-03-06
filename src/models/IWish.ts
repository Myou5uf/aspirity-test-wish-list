export interface IWish {
    id: string;
    name: string;
    fulfilled: boolean;
    priority: boolean;
    order: number;
}

export interface WishListState {
    wishes: IWish[];
    count: number;
}

export interface UpdatePayload {
    id: string;
    name: string;
}

export interface DragAndDropPayload {
    currentWish: IWish,
    lastWish: IWish,
}
