import { createReducer, on } from '@ngrx/store';
import { addLike, updateLike, deleteLike } from '../Actions/like.action';
import { Like } from '../../Models/like';

const initialState : ReadonlyArray<Like> = [];

export const likeReducer = createReducer(
    initialState,
    on(addLike, (state, {like})=>[...state, like]),
    on(updateLike, (state, {like})=>{
        const likes = state.map((m) => {
            if (m.id_product === like.id_product) {
              return like;
            }
            return m;
        });
        return likes;
    }),
    on(deleteLike, (state, {likeId}) => state.filter((like) => like.id_product !== likeId))
)