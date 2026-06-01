"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProgressState } from '@/constants/progresscircle';
import { GameState } from './types';

const initialState: GameState = {
	currIndex: 0,
	guess: null,
	progressStates: [],
	gameStartTime: null,
	gameEndTime: null,
	showResults: null
}

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setGuess: (state, action: PayloadAction<boolean | null | undefined>) => {
			state.guess = action.payload;
		},
		setProgressStates: (state, action: PayloadAction<ProgressState[]>) => {
			state.progressStates = action.payload;
		},
		setGameStartTime: (state, action: PayloadAction<number | null | undefined>) => {
			state.gameStartTime = action.payload;
		},
		setGameEndTime: (state, action: PayloadAction<number | null | undefined>) => {
			state.gameEndTime = action.payload;
		},
		setShowResults: (state, action: PayloadAction<boolean | null | undefined>) => {
			state.showResults = action.payload;
		},
		processGuess: (state, action: PayloadAction<ProgressState[]>) => {
			state.currIndex += 1;
			state.guess = null;
			state.progressStates = action.payload;
		}
	}
})

export const {
	setGuess,
	processGuess,
	setProgressStates,
	setGameStartTime,
	setGameEndTime,
	setShowResults
} = gameSlice.actions;
export default gameSlice.reducer;