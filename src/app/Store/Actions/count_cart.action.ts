import { createAction } from '@ngrx/store';

export const incrementCart = createAction('[Cart] Increment');
export const decrementCart = createAction('[Cart] Decrement');
export const resetCart = createAction('[Cart] Reset');
export const getCart = createAction('[Cart] Get', (cart: number) => ({ cart }));