import { createReducer, on } from '@ngrx/store';
import { addCart, updateCart, deleteCart } from '../Actions/cart.action';
import { Cart } from '../../Models/cart';

const initialState : ReadonlyArray<Cart> = [];

export const cartReducer = createReducer(
    initialState,
    on(addCart, (state, {cart})=>[...state, cart]),
    on(updateCart, (state, {cart})=>{
        const carts = state.map((m) => {
            if (m.id_product === cart.id_product) {
              return cart;
            }
            return m;
        });
        return carts;
    }),
    on(deleteCart, (state, {cartId}) => state.filter((cart) => cart.id_product !== cartId))
)