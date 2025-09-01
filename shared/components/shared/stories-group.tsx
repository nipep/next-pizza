"use client";

import { Api } from "@/shared/services/api-client";
import { IStory } from "@/shared/services/stories";
import { useEffect, useRef, useState } from "react";
import Stories from "react-insta-stories";
import { Container } from "./container";
import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";
import { useIntersection } from "react-use";
import useDetectedMobile from "@/shared/hooks/use-detected-mobile";

interface Props {
  className?: string;
}

export const StoriesGroup: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = useState<IStory[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<IStory>();
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {});

  useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }
    fetchStories();
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setOpen(false);
    }
  }, [intersection?.isIntersecting]);

  const { isMobile } = useDetectedMobile();

  return (
    <div ref={intersectionRef}>
      <Container
        className={cn(
          "flex items-center justify-between gap-2 my-10 overflow-x-scroll",
          className
        )}
      >
        {stories.length === 0 &&
          [...Array(isMobile ? 3 : 6)].map((_, index) => (
            <div
              key={index}
              className={cn(
                "bg-gray-200 rounded-md animate-pulse",
                isMobile ? "w-[100px] h-[150px] " : "w-[200px] h-[250px]"
              )}
            />
          ))}
        {stories.map((story) => (
          <img
            key={story.id}
            onClick={() => onClickStory(story)}
            className="rounded-md cursor-pointer"
            height={250}
            width={200}
            src={story.previewImageUrl}
          />
        ))}
      </Container>
      {intersection?.isIntersecting && open && (
        <div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-50">
          <div className="relative" style={{ width: 520 }}>
            <button
              className={
                isMobile
                  ? "absolute right-10 -top-8 z-30"
                  : "absolute -right-10 -top-5 z-30"
              }
              onClick={() => setOpen(false)}
            >
              <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
            </button>
            <div className="flex justify-center">
              <Stories
                onAllStoriesEnd={() => setOpen(false)}
                stories={
                  selectedStory?.items.map((item) => ({
                    url: item.sourceUrl,
                  })) || []
                }
                defaultInterval={3000}
                width={isMobile ? 300 : 520}
                height={isMobile ? 500 : 750}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

