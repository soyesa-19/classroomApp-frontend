import styled from "styled-components";
import { SectionContainer } from "./SectionContainer";

const Video = styled.video`
  width: 100%;
`;

export type VideoSectionProps = {
  src: string;
  onEnded?: () => void;
};
export function VideoSection({ src, onEnded }: VideoSectionProps) {
  return (
    <SectionContainer>
      <Video src={src} onEnded={onEnded} autoPlay />
    </SectionContainer>
  );
}
