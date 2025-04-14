import { useEffect, useState, useRef } from "react";
import { Section, Session } from "../../types/classroom";
import { VideoSection } from "./VideoSection";
import { IframeSection } from "./IframeSection";
import { eventBus } from "../../utils/EventBus";

export type SessionPlayerProps = {
  sections: Section[];
  isPlaying: boolean;
  elapsedTimeInMinutes: number;
  session?: Session;
};

export function SessionPlayer({
  sections,
  isPlaying,
  elapsedTimeInMinutes,
}: SessionPlayerProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const elapsedTimeRef = useRef<number>(0);
  const initializedRef = useRef(false);

  // Handle initialization
  useEffect(() => {
    if (!isPlaying) {
      initializedRef.current = false;
    }

    let accumulatedTime = 0;
    let targetIndex = 0;
    let elapsedSectionTime = 0;

    for (let i = 0; i < sections.length; i++) {
      const sectionDuration = sections[i].durationInMinutes;
      if (elapsedTimeInMinutes < accumulatedTime + sectionDuration) {
        targetIndex = i;
        elapsedSectionTime = elapsedTimeInMinutes - accumulatedTime;
        break;
      }
      accumulatedTime += sectionDuration;
    }

    setCurrentSectionIndex(targetIndex);
    elapsedTimeRef.current = elapsedSectionTime * 60 * 1000;
    initializedRef.current = true;
  }, [elapsedTimeInMinutes, sections, isPlaying]);

  // Handle subsequent section timing
  useEffect(() => {
    if (!initializedRef.current) {
      return;
    }
    if (!isPlaying) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      return;
    }

    const currentSection = sections[currentSectionIndex];
    if (!currentSection) return;

    let durationMs = currentSection.durationInMinutes * 60 * 1000;

    // In case of video type set timeout for next section.
    let nextNonVideoSectionIndex = currentSectionIndex + 1;
    let nextNonVideoSection = sections[nextNonVideoSectionIndex];
    while (nextNonVideoSection?.type === "video") {
      nextNonVideoSectionIndex += 1;
      nextNonVideoSection = sections[nextNonVideoSectionIndex];
    }
    if (nextNonVideoSection && currentSection.type === "video") {
      durationMs += nextNonVideoSection.durationInMinutes * 60 * 1000;
    }

    if (elapsedTimeRef.current) {
      durationMs -= elapsedTimeRef.current;
      elapsedTimeRef.current = 0;
    }

    timeoutRef.current = setTimeout(() => {
      if (currentSectionIndex < sections.length - 1) {
        setCurrentSectionIndex(currentSectionIndex + 1);
      }
    }, durationMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentSectionIndex, isPlaying, sections]);

  const handleVideoEnded = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  if (!isPlaying) {
    return null;
  }

  const currentSection = sections[currentSectionIndex];
  if (!currentSection) {
    return null;
  }

  return (
    <>
      {currentSection.type === "video" && (
        <VideoSection
          src={currentSection.properties.src}
          onEnded={handleVideoEnded}
        />
      )}
      {currentSection.type === "game" && (
        <IframeSection
          src={currentSection.properties.src}
          eventBus={eventBus}
          properties={currentSection.properties}
        />
      )}
    </>
  );
}
