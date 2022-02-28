import { createAction } from '@ngrx/store';

export const incrementLike = createAction('[Like] Increment');
export const decrementLike = createAction('[Like] Decrement');
export const resetLike = createAction('[Like] Reset');
export const getLike = createAction('[Like] Get', (like: number) => ({ like }));