import { MatrixDefinition } from "@/types/MatrixDefinition";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface ConfigState {
  name: string;
  matrix: MatrixDefinition;
}

// Define the initial state using that type
export const initialState: ConfigState = {
  name: "",
  matrix: {
    label: "",
    rows: 0,
    columns: 0,
    items: 0,
  },
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setName: (state: ConfigState, action: PayloadAction<string>) => {
      return { ...state, name: action.payload };
    },
    setMatrix: (
      state: ConfigState,
      action: PayloadAction<MatrixDefinition>
    ) => {
      return { ...state, matrix: action.payload };
    },
  },
});

export const { setName, setMatrix } = configSlice.actions;

// Selectors

export const selectName = (state: RootState) => state.config.name;
export const selectMatrix = (state: RootState) => state.config.matrix;

export default configSlice.reducer;
