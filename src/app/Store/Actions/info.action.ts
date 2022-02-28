import { createAction } from '@ngrx/store';
import { Info } from '../../Models/info';

export const getInfo = createAction('[Info] Get info');

export const addInfo = createAction(
  '[Info] Add info',
  (info: Info) => ({ info })
);

export const updateInfo = createAction(
  '[Info] Update info',
  (info: Info) => ({ info })
);

export const deleteInfo = createAction(
  '[Info] Delete info',
  (infoId: number) => ({ infoId })
);