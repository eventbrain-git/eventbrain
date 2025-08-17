import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// --- TYPES ---

export interface Artist {
  artistId: number;
  artistName: string;
  createdAt: string;
}

export interface UserProfile {
  userProfileId: number;
  userProfileName: string;
  userProfileDescription: string;
}

export interface Status {
  statusId: number;
  statusName: string;
  statusDescription: string;
}

export interface AccountType {
  typeId: number;
  typeName: string;
  typeDescription: string;
}

export interface Account {
  accountId: number;
  accountName: string;
  statusId: number;
  typeId: number;
  status: Status;
  type: AccountType;
}

export interface User {
  userId: number;
  userEmail: string; // ajouté pour cohérence avec login
  userFirstName: string;
  userLastName: string;
  userProfileId: number;
  statusId: number;
  accountId: number;
  profile: UserProfile;
  status: Status;
  account: Account;
}

export interface GetUserResponse {
  user: User;
}

// --- API ---
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
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
      transformResponse: (response: GetUserResponse) => response.user,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
});

// --- HOOKS RTK QUERY ---
export const { useGetArtistsQuery, useGetUserQuery } = api;
