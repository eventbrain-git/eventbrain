// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api"; // ton api RTK Query

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, // ⚡️ le reducer RTK Query
    // ici tu peux ajouter tes autres reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // ⚡️ important pour RTK Query
});

// Types pour TypeScript
export type RootState = ReturnType<typeof store.getState>; // type du state complet
export type AppDispatch = typeof store.dispatch; // type du dispatch avec RTK Query
