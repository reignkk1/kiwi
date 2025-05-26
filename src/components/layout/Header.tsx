import styled from "styled-components";

export default function HeaderTitle({ title }: { title: string }) {
  return (
    <Container>
      <Content>{title}</Content>
    </Container>
  );
}

const Container = styled.header`
  width: 100%;
  margin-bottom: 30px;
`;
const Content = styled.div`
  color: white;
  font-weight: bold;
  font-size: 25px;
`;
