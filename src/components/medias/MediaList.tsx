/* eslint-disable @next/next/no-img-element */
"use client";
import { CompleteMedia } from "@/lib/db/schema/medias";
import { trpc } from "@/lib/trpc/client";
import MediaModal from "./MediaModal";


export default function MediaList({ medias }: { medias: CompleteMedia[] }) {
  const { data: m } = trpc.medias.getMedias.useQuery(undefined, {
    initialData: { medias },
    refetchOnMount: false,
  });

  if (m.medias.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {m.medias.map((media: CompleteMedia) => (
        <Media media={media} key={media.id} />
      ))}
    </ul>
  );
}

const Media = ({ media }: { media: CompleteMedia }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="grid grid-cols-3 space-x-3">
        <div className="flex flex-col">
          <h1 className="font-bold">Image</h1>
          <div className="w-full">
            <img
              src={media.url}
              alt={media.url}
              className="h-[50px] w-[50px] object-contain rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold">Content</h1>
          <div className="w-full">
            <div className="p-2">{media.feed.content}</div>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold">FeedId</h1>
          <div className="w-full">
            <div className="p-2">{media.feedId}</div>
          </div>
        </div>
      </div>

      <MediaModal media={media} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No medias</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new media.
      </p>
      <div className="mt-6">
        <MediaModal emptyState={true} />
      </div>
    </div>
  );
};

