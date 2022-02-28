import { createReducer, on } from '@ngrx/store';
import { login, logout } from '../../Store/Actions/login.actions';

const initialState = false;

export const loginReducer = createReducer(
    initialState,
    on(login, (state)=> true),
    on(logout, (state)=> false),
)
