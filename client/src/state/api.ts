import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Artist {
  artistId: number;
  artistName: string;
  createdAt: string;
}

export interface User {
  userId: number;
  userFirstName: string;
  userLastName: string,
  userEmail: string;
  accountTypeName: string;
  accoutn: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: "include",
  }),
  reducerPath: "api",
  tagTypes: ["Artist", "User"],
  endpoints: (build) => ({
    // --- ARTISTS ---
    getArtists: build.query<{ artists: Artist[] }, void>({
      query: () => "artist",
      providesTags: (result) =>
        result?.artists
          ? [
              ...result.artists.map(({ artistId }) => ({
                type: "Artist" as const,
                id: artistId,
              })),
              { type: "Artist", id: "LIST" },
            ]
          : [{ type: "Artist", id: "LIST" }],
    }),

    // --- USERS ---
    getUser: build.query<User, number>({
      query: (id) => `user/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
});

export const { useGetArtistsQuery, useGetUserQuery } = api;
