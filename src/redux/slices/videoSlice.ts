"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoConstants, VideoType } from '@/constants/videotypes';

const initialState: {video: VideoType} = {
    video: VideoConstants.VIDEO,
}

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        setVideo: (state, action: PayloadAction<VideoType>) => {
            state.video = action.payload;
        }
    }
})

export const { setVideo } = videoSlice.actions;
export default videoSlice.reducer;

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setAuth: (state, action: PayloadAction<boolean>) => {
//       state.auth = action.payload;
//     },
//   },
// });

// export const { setAuth } = authSlice.actions;
// export default authSlice.reducer;
