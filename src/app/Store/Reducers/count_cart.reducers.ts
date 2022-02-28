import { createReducer, on } from '@ngrx/store';
import { incrementCart, decrementCart, resetCart, getCart } from '../Actions/count_cart.action';

export const initialState = 0;

export const countCartReducer = createReducer(
    initialState,
    on(incrementCart, (state) => state + 1 ),
    on(decrementCart, (state) => state - 1),
    on(resetCart, (state) => 0),
    on(getCart, (state, {cart}) => cart)
);
