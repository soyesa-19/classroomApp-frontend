import React from "react";
import { EventBus } from "../../utils/EventBus";
import { SectionContainer } from "./SectionContainer";

export type IframeSectionProps = {
  src: string;
  eventBus: EventBus;
  properties?: unknown;
};

export function IframeSection({
  src,
  eventBus,
  properties,
}: IframeSectionProps) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const iframeContainerRef = React.useRef<HTMLDivElement>(null);
  const [isLoading, setIsloading] = React.useState(true);

  const intializeEventBus = React.useCallback(
    (element: HTMLIFrameElement) => {
      eventBus.setIframe(element);
      iframeRef.current = element;
    },
    [eventBus]
  );

  return (
    <SectionContainer ref={iframeContainerRef}>
      {isLoading && "Loading..."}
      <iframe
        ref={intializeEventBus}
        src={src}
        width="100%"
        height={"100%"}
        onLoad={() => {
          setIsloading(false);
          if (iframeRef.current?.contentWindow) {
            eventBus.emit("connect", {
              customProperties: properties,
              containerProperties: {
                rect: iframeContainerRef.current?.getBoundingClientRect(),
              },
            });
          }
        }}
      />
    </SectionContainer>
  );
}
