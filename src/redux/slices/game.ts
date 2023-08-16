import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface GameState {
  hits: number;
  errors: number;
  scores: {
    name: string;
    attempts: number;
    rating: number;
    game: string;
  }[];
}

// Define the initial state using that type
export const initialState: GameState = {
  hits: 0,
  errors: 0,
  scores: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    addHit: (state: GameState) => {
      return { ...state, hits: state.hits + 1 };
    },
    addError: (state: GameState) => {
      return { ...state, errors: state.errors + 1 };
    },
    addNewScore: (
      state: GameState,
      action: PayloadAction<{
        name: string;
        attempts: number;
        rating: number;
        game: string;
      }>
    ) => {
      return {
        ...state,
        scores: [...state.scores, action.payload],
      };
    },
    restoreStorage: (state: GameState) => {
      return { ...state, hits: 0, errors: 0 };
    },
  },
});

export const { addHit, addError, addNewScore, restoreStorage } =
  gameSlice.actions;

// Selectors

export const selectHits = (state: RootState) => state.game.hits;
export const selectErrors = (state: RootState) => state.game.errors;
export const selectScores = (state: RootState) => state.game.scores;

export default gameSlice.reducer;
