import { createReducer, on } from '@ngrx/store';
import { Info } from 'src/app/Models/info';
import { addInfo, updateInfo, deleteInfo } from '../Actions/info.action';

export interface InfoState {
  infos: ReadonlyArray<Info>;
}

const initialState: ReadonlyArray<Info> = [];

export const infoReducer = createReducer(
    initialState,
    on(addInfo, (state, {info}) => [...state, info]),
    on(updateInfo, (state, {info}) => {
        const infos = state.map((m) => {
            if (m.id === info.id) {
              return info;
            }
            return m;
        });
        return infos;
    }),
    on(deleteInfo, (state, { infoId }) =>
    state.filter((info) => info.id !== infoId)
  )
)