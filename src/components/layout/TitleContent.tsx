import { ReactNode } from "react";
import styled from "styled-components";

export default function TitleContent({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Title>{title}</Title>
      <div>{children}</div>
    </div>
  );
}

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
`;
