"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProgressConstants, ProgressCircle, ProgressStatus, PROGRESS_CIRCLE_COLORS, PROGRESS_HIGHLIGHT_COLORS, PROGRESS_TEXT_COLORS } from '@/constants/progresscircle';
import { GameState } from './types';
import { Video } from "@/constants/video";
import { GameModeConstants } from '@/constants/gamemode';

interface RandomDateProps {
	start: Date;
	end: Date;
}

interface ProcessGuessProps {
	gameMode: string;
	guess: number | Date | null;
}

const getRandomCount = () => Math.floor(Math.random() * 1000)
const getRandomDate = ({ start, end }: RandomDateProps) => {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const initialState: GameState = {
	theme: '',
	currIndex: 0,
	target: getRandomCount(),
	// Arbitrary starting date - guessing videos before 2016 would be obv to guess based on video quality
	targetDate: getRandomDate({ start: new Date(2016, 0, 1), end: new Date() }),
	guess: null,
	progressCircles: [],
	videos: [],
	gameStartTime: null,
	gameEndTime: null,
	showResults: null,
}

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setCurrIndex: (state, action: PayloadAction<number>) => {
			state.currIndex = action.payload;
		},
		setTheme: (state, action: PayloadAction<string>) => {
			state.theme = action.payload;
		},
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
		setGuess: (state, action: PayloadAction<number | Date | null>) => {
			state.guess = action.payload;
		},
		setVideos: (state, action: PayloadAction<Video[]>) => {
			state.videos = action.payload;
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
		processGuess: (state, action: PayloadAction<ProcessGuessProps>) => {
			const gameMode = action.payload.gameMode;
			const userGuess = action.payload.guess;

			const videos = state.videos;
			const currIndex = state.currIndex;
			const target = state.target;
			const targetDate = state.targetDate;

			if (userGuess === null || state.currIndex >= state.videos.length) return;

			let currStatus: ProgressStatus = ProgressConstants.UNFINISHED;

			switch (gameMode) {
				// Number target - Higher/Lower
				// LIKES + VIEWERS game modes
				case GameModeConstants.VIEWERS:
				case GameModeConstants.LIKES:

					const viewers = gameMode === GameModeConstants.VIEWERS
					const currVideoStat = (viewers) ? videos[currIndex].viewCount : videos[currIndex].likeCount;
					const higher = currVideoStat >= target;

					// Guess made
					if (userGuess != null && (typeof (userGuess) === "number")) {
						if ((higher && (userGuess >= target)) || (!higher && (userGuess < target))) {
							currStatus = ProgressConstants.CORRECT;
						}
						else currStatus = ProgressConstants.INCORRECT;
					}

					// Set new target
					if (viewers) state.target = videos[currIndex].viewCount;
					else state.target = videos[currIndex].likeCount;

					break;

				// Guess video upload date, w/ multiple hints - TODO
				case (GameModeConstants.UPLOAD):
					return;

				// Guess channel aspects, given pic - TODO
				case (GameModeConstants.CHANNEL):
					return;

				// Guess the YouTube title, given a set of thumbnails - TODO
				case (GameModeConstants.THUMBNAIL):
					return;
			}

			state.progressCircles[currIndex] = {
				status: currStatus,
				circleColor: PROGRESS_CIRCLE_COLORS[currStatus],
				highlightColor: PROGRESS_HIGHLIGHT_COLORS[currStatus],
				textColor: PROGRESS_TEXT_COLORS[currStatus],
				guess: userGuess
			}

			state.currIndex += 1;
			state.guess = null;
		},
		resetGame: (state, action: PayloadAction<{ videos: Video[], newTheme: string }>) => {
			const videos = action.payload.videos;
			const newTheme = action.payload.newTheme;
			const currStatus = ProgressConstants.UNFINISHED

			state.currIndex = 0;
			state.progressCircles = Array.from({ length: videos.length }, () => ({
				status: currStatus,
				circleColor: PROGRESS_CIRCLE_COLORS[currStatus],
				highlightColor: PROGRESS_HIGHLIGHT_COLORS[currStatus],
				textColor: PROGRESS_TEXT_COLORS[currStatus],
				guess: null,
			}));
			state.guess = null;
			state.theme = newTheme;
			state.gameStartTime = Date.now();
			state.gameEndTime = null;
			state.showResults = false;
			state.videos = videos;
		}
	}
})

export const {
	resetGame,
	setCurrIndex,
	setTheme,
	setTarget,
	setTargetDate,
	setGuess,
	processGuess,
	setVideos,
	setGameStartTime,
	setGameEndTime,
	setShowResults
} = gameSlice.actions;
export default gameSlice.reducer;