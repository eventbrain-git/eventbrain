import { useGetArtistsQuery } from '@/state/api';
import { Music2 } from 'lucide-react';
import React from 'react';

const ArtistsCard = () => {
  const { data, isLoading } = useGetArtistsQuery();

  return (
    <div className="row-span-3 xl:row-span-6 bg-[var(--bg-high-light)] dark:bg-[var(--bg-high-dark)] shadow-md rounded-2xl pb-16">
      {isLoading ? (
        <div className='m-5'>
          Loading...
        </div>
      ) : (
        <>
          <h3 className='text-lg font-semibold px-7 pt-5 pb-2'>
            Artists
          </h3>
          <hr />
          <div className='overflow-auto h-full'>
            {data?.artists.map((artist: { artistId: number; artistName: string; createdAt: string }) => (
              <div
                key={artist.artistId}
                className='flex items-center justify-between gap-3 px-5 py-4 border-b'
              >
                <div className='flex items-center gap-3'>
                  <Music2 className="w-6 h-6 text-purple-500" />
                  <div className='flex flex-col'>
                    <div className='font-bold text-sm'>{artist.artistName}</div>
                    <div className='text-xs text-gray-500'>
                      {new Date(artist.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className='text-xs text-gray-400'>
                  # {artist.artistId}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ArtistsCard;
