import styled from "styled-components";

interface TitleAndSingerProps {
  title: string | React.ReactNode;
  singer: string | React.ReactNode;
  animation?: boolean;
  size: "small" | "middle" | "large";
  onClick?: () => void;
  width?: string;
}

const sizeMap = {
  small: { titleSize: "15px", singerSize: "13px" },
  middle: { titleSize: "16px", singerSize: "14px" },
  large: { titleSize: "18px", singerSize: "16px" },
};

export function TitleAndSinger({
  animation = false,
  size,
  onClick,
  title,
  singer,
  width,
}: TitleAndSingerProps) {
  const { titleSize, singerSize } = sizeMap[size];
  return (
    <Container width={width} onClick={onClick}>
      <Title size={titleSize}>{title}</Title>
      <Singer size={singerSize}>{singer}</Singer>
    </Container>
  );
}

const Container = styled.div<{ width?: string }>`
  width: ${({ width }) => width};
`;
const Title = styled.div<{ size: string }>`
  font-size: ${({ size }) => size};
  color: white;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 5px;
`;
const Singer = styled.div<{ size: string }>`
  font-size: ${({ size }) => size};
  color: var(--singer-color);
`;
