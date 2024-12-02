"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoConstants, VideoType } from '@/constants/videotypes';
import { ClipConstants, ClipType } from '@/constants/clips';
import { ModeConstants, ModeType } from '@/constants/modes';

const initialState: {video: VideoType, clips: ClipType, mode: ModeType, timer: string} = {
    video: VideoConstants.VIDEO,
    clips: ClipConstants.SHORT,
    mode: ModeConstants.NORMAL,
    timer: "0",
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setVideo: (state, action: PayloadAction<VideoType>) => {
            state.video = action.payload;
        },
        setClips: (state, action: PayloadAction<ClipType>) => {
            state.clips = action.payload;
        },
        setMode: (state, action: PayloadAction<ModeType>) => {
            state.mode = action.payload;
        },
        setTimer: (state, action: PayloadAction<string>) => {
            if (Number.isNaN(action.payload)) {
                state.timer = "0";
            }
            else {
                state.timer = action.payload;
            }
        }
    }
})

export const { setVideo, setClips, setMode, setTimer } = gameSlice.actions;
export default gameSlice.reducer;