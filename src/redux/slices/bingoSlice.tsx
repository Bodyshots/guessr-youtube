"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BingoState, BingoCell } from './types';
import { useState, useRef } from 'react';
import Draggable from 'react-draggable';

const initialState: BingoState = {
  width: 5,
  board: null,
};

const bingoSlice = createSlice({
  name: 'bingo',
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<BingoCell[][]>) => {
      state.board = action.payload;
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    }
  },
});

export const { setBoard, setWidth } = bingoSlice.actions;
export default bingoSlice.reducer;
