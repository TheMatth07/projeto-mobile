import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (category = "all") => {

    let url = "/products";

    // se não for "all", busca por categoria
    if (category && category !== "all") {
      url = `/products/category/${category}`;
    }

    const response = await api.get(url);

    return response.data.products;
  }
);

const productsSlice = createSlice({
  name: "products",

  initialState: {
    items: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })

      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Erro ao carregar produtos";
      });
  },
});

export default productsSlice.reducer;