import styled, { css } from "styled-components";
import { palette } from "../../constant";

interface TitleAndSingerProps {
  title: React.ReactNode;
  singer: React.ReactNode;
  size: "small" | "middle" | "large";
  $isWhiteSpace?: boolean;
  $isAnimation?: boolean;
  onClick?: () => void;
  width?: string;
}

const sizeMap = {
  small: { titleSize: "15px", singerSize: "13px" },
  middle: { titleSize: "16px", singerSize: "14px" },
  large: { titleSize: "18px", singerSize: "16px" },
};

export function TitleAndSinger({
  $isAnimation = false,
  $isWhiteSpace = true,
  width = "auto",
  size,
  onClick,
  title,
  singer,
}: TitleAndSingerProps) {
  const { titleSize, singerSize } = sizeMap[size];

  const titleContent = (
    <>
      <span>{title}</span>
      {$isAnimation && (
        <span>
          &nbsp; &nbsp; &nbsp; &nbsp; {title} &nbsp; &nbsp; &nbsp; &nbsp;
        </span>
      )}
    </>
  );

  return (
    <Container width={width} onClick={onClick}>
      <Title
        size={titleSize}
        $isAnimation={$isAnimation}
        $isWhiteSpace={$isWhiteSpace}
      >
        {titleContent}
      </Title>
      <Singer size={singerSize}>{singer}</Singer>
    </Container>
  );
}

const Container = styled.div<{ width?: string }>`
  width: ${({ width }) => width};
  overflow: hidden;
`;
const Title = styled.div<{
  size: string;
  $isAnimation: boolean;
  $isWhiteSpace: boolean;
}>`
  display: inline-block;
  font-size: ${({ size }) => size};
  color: ${palette.musicTitle};
  margin-bottom: 5px;
  overflow: hidden;

  ${({ $isWhiteSpace }) =>
    $isWhiteSpace
      ? css`
          white-space: nowrap;
        `
      : css`
          line-height: 1.5;
        `}

  ${({ $isAnimation }) =>
    $isAnimation
      ? css`
          animation: marquee 15s linear infinite;
          animation-play-state: running;
          animation-delay: 3s;
        `
      : css`
          width: 100%;
          text-overflow: ellipsis;
        `}

  @keyframes marquee {
    0% {
      transform: translateX(0%);
    }

    30% {
      transform: translateX(0%);
    }

    100% {
      transform: translateX(-50%);
    }
  }
`;
const Singer = styled.div<{ size: string }>`
  font-size: ${({ size }) => size};
  color: ${palette.musicSinger};
`;
