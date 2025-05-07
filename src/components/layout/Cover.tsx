import { ReactNode } from "react";
import styled from "styled-components";

export default function Cover({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}

const Container = styled.div``;
