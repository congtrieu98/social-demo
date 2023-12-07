/* eslint-disable @next/next/no-img-element */
"use client";
import { CompleteFeed } from "@/lib/db/schema/feeds";
import { trpc } from "@/lib/trpc/client";
import FeedModal from "./FeedModal";
import FeedImagesModal from "./FeedImagesModal";

export default function FeedList({ feeds }: { feeds: CompleteFeed[] }) {
  const { data: f } = trpc.feeds.getFeeds.useQuery(undefined, {
    initialData: { feeds },
    refetchOnMount: false,
  });

  if (f.feeds.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.feeds.map((feed: CompleteFeed, index) => (
        <>
        <Feed feed={feed} key={feed.id} />
        {index < f.feeds.length - 1 && <div className="h-[1px] bg-gray-200 w-full"></div>}
        </>
      ))}
    </ul>
  );
}

const Feed = ({ feed }: { feed: CompleteFeed }) => {
  return (
    <>
      <li className="relative flex-col justify-between my-2">
        <div className="mt-2 text-center mb-2">{feed.content}</div>
        <div className="flex justify-center items-center w-full">
            {<FeedImagesModal medias={feed.medias} />}
          </div>
        <div className="absolute -top-2 right-20">
          <FeedModal feed={feed} />
        </div>
      </li>
    </>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No feeds</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new feed.
      </p>
      <div className="mt-6">
        <FeedModal emptyState={true} />
      </div>
    </div>
  );
};
