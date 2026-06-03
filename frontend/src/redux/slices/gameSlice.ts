"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProgressState } from '@/constants/progresscircle';
import { GameState } from './types';

interface RandomDateProps {
	start: Date;
	end: Date;
}

const getRandomCount = () => Math.floor(Math.random() * 1000)
const getRandomDate = ({ start, end }: RandomDateProps) => {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const initialState: GameState = {
	currIndex: 0,
	target: getRandomCount(),
	// Arbitrary starting date - guessing videos before 2016 would be obv to guess based on video quality
	targetDate: getRandomDate({ start: new Date(2016, 0, 1), end: new Date() }),
	guess: null,
	progressStates: [],
	gameStartTime: null,
	gameEndTime: null,
	showResults: null,
}

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setTarget: (state, action: PayloadAction<number>) => {
			state.target = action.payload;
		},
		setTargetDate: (state, action: PayloadAction<Date>) => {
			state.targetDate = action.payload;
		},
		setRandomTargetNumber: (state) => {
			state.target = getRandomCount();
		},
		setRandomTargetDate: (state) => {
			state.targetDate = getRandomDate({ start: new Date(2016, 0, 1), end: new Date() })
		},
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
		},
	}
})

export const {
	setTarget,
	setTargetDate,
	setGuess,
	processGuess,
	setProgressStates,
	setGameStartTime,
	setGameEndTime,
	setShowResults
} = gameSlice.actions;
export default gameSlice.reducer;