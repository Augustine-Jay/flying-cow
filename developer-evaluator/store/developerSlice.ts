import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Developer } from "../types";

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
      // API调用占位符
      // 需要接收的数据: Developer[]
      // API应该接受filters作为参数，并返回过滤后的开发者列表
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
      })
      .addCase(fetchDevelopers.fulfilled, (state, action) => {
        state.loading = false;
        state.developers = action.payload;
      })
      .addCase(fetchDevelopers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters } = developerSlice.actions;
export default developerSlice.reducer;
