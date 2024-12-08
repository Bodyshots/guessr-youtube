"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PrivacyState } from './types';

const initialState: PrivacyState = {
  privacy_ack: false,
};

const privacySlice = createSlice({
  name: 'privacy',
  initialState,
  reducers: {
    setPrivacyAck: (state, action: PayloadAction<boolean>) => {
      state.privacy_ack = action.payload;
    },
  },
});

export const { setPrivacyAck } = privacySlice.actions;
export default privacySlice.reducer;
