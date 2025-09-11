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
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  userProfileId: number;
  statusId: number;
  accountId: number;
  profile: UserProfile;
  status: Status;
  account: Account;
}

// --- API ---
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),  
  tagTypes: ["Artist", "User"],
  endpoints: (build) => ({
    // --- ARTISTS ---
    getArtists: build.query<{ artists: Artist[] }, void>({
      query: () => "artist",
      providesTags: (result) =>
        result?.artists
          ? [
              ...result.artists.map(({ artistId }) => ({ type: "Artist" as const, id: artistId })),
              { type: "Artist", id: "LIST" },
            ]
          : [{ type: "Artist", id: "LIST" }],
    }),

    // --- USERS ---
    getUser: build.query<User, number>({
      query: (id) => `user/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // --- LOGIN ---
    login: build.mutation<{ user: User; token: string }, { login: string; password: string }>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.token) {
            localStorage.setItem("token", data.token);
          }
        } catch (err) {
          console.error("❌ Erreur lors du stockage du token :", err);
        }
      },
    }),    

    // --- ME (récupérer l'utilisateur connecté) ---
    getMe: build.query<{ user: User | null }, void>({
      query: () => "auth/me",
      providesTags: [{ type: "User", id: "ME" }],
    }),
  }),
});

// --- HOOKS RTK QUERY ---
export const {
  useGetArtistsQuery,
  useGetUserQuery,
  useLoginMutation,
  useGetMeQuery,
} = api;
