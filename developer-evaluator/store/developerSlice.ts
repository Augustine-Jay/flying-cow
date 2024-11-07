import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Developer {
  id: number;
  name: string;
  domain: string;
  nationality: string;
  rank: number;
}

interface DeveloperState {
  developers: Developer[];
  loading: boolean;
  error: string | null;
  filters: {
    domain: string;
    nationality: string;
    name: string;
  };
}

const initialState: DeveloperState = {
  developers: [],
  loading: false,
  error: null,
  filters: {
    domain: "All",
    nationality: "All",
    name: "",
  },
};

export const fetchDevelopers = createAsyncThunk(
  "developers/fetchDevelopers",
  async (_, { getState, rejectWithValue }) => {
    const { filters } = (getState() as { developers: DeveloperState })
      .developers;
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data: Developer[] = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Developer ${i + 1}`,
        domain: ["3D", "Ajax", "Algorithm", "Amp"][
          Math.floor(Math.random() * 4)
        ],
        nationality: ["China", "America", "Japan", "England", "Russia"][
          Math.floor(Math.random() * 5)
        ],
        rank: Math.floor(Math.random() * 100) + 1,
      }));
      return data;
    } catch (error) {
      return rejectWithValue("Failed to fetch developers");
    }
  }
);

const developerSlice = createSlice({
  name: "developers",
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<Partial<DeveloperState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevelopers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDevelopers.fulfilled, (state, action) => {
        state.loading = false;
        state.developers = action.payload;
        state.error = null;
      })
      .addCase(fetchDevelopers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters } = developerSlice.actions;
export default developerSlice.reducer;

// Commented out API call
/*
export const fetchDevelopers = createAsyncThunk(
  "developers/fetchDevelopers",
  async (_, { getState, rejectWithValue }) => {
    const { filters } = (getState() as { developers: DeveloperState }).developers;
    try {
      const response = await fetch("/api/developers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch developers");
      }
      const data: Developer[] = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("Failed to fetch developers");
    }
  }
);
*/
