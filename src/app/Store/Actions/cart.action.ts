import { createAction } from '@ngrx/store';
import { Cart } from '../../Models/cart';

export const addCart = createAction(
    '[Cart] Add cart',
    (cart: Cart) => ({ cart })
)

export const updateCart = createAction(
    '[Cart] Update cart',
    (cart: Cart) => ({ cart })
)

export const deleteCart = createAction(
    '[Cart] Delete cart',
    (cartId: string) => ({ cartId })
)