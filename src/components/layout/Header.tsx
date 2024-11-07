import styled from "styled-components";

export default function Header({ title }: { title: string }) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}

const Container = styled.header`
  width: 100%;
  margin-bottom: 30px;
`;
const Title = styled.h1`
  color: white;
  font-weight: bold;
  font-size: 25px;
`;
