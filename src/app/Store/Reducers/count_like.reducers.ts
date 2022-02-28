import { createReducer, on } from '@ngrx/store';
import { incrementLike, decrementLike, resetLike, getLike } from '../Actions/count_like.action';

export const initialState = 0;

export const countLikeReducer = createReducer(
    initialState,
    on(incrementLike, (state) => state + 1 ),
    on(decrementLike, (state) => state - 1),
    on(resetLike, (state) => 0),
    on(getLike, (state, {like}) => like)
);
