import { createSlice } from '@reduxjs/toolkit';

import { IPrefecture, IRegion } from '@/types/prefecture';
const appSlice = createSlice({
  name: 'app',
  initialState: {
    locations: [],
  },
  reducers: {
    setLocations(state, action) {
      const _regions = action.payload.map((item: IRegion) => {
        return {
          ...item,
          id: Number(item.id),
          prefectures: item.prefectures.map((prefecture: IPrefecture) => ({
            ...prefecture,
            id: Number(prefecture.id),
          })),
        };
      });
      state.locations = _regions;
    },
  },
});

export const appAction = appSlice.actions;

export const appReducer = appSlice.reducer;
