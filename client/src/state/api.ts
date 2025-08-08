import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Artist {
  artistId: number;
  artistName: string;
  createdAt: string;
}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["Artist"],
    endpoints: (build) => ({
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
    }),
  });
  
  export const { useGetArtistsQuery } = api;
  
