import { createAction } from '@ngrx/store';
import { Like } from '../../Models/like';

export const addLike = createAction(
    '[Like] Add like',
    (like: Like) => ({ like })
)

export const updateLike = createAction(
    '[Like] Update like',
    (like: Like) => ({ like })
)

export const deleteLike = createAction(
    '[Like] Delete like',
    (likeId: string) => ({ likeId })
)