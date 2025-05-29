import styled from "styled-components";

export default function InfoTable({
  info,
}: {
  info: Array<Record<"key" | "value", string | null | undefined>>;
}) {
  return (
    <Container>
      <Ul>
        {info.map((data) => (
          <List>
            <Key>
              <span>{data.key}</span>
            </Key>
            <Value>
              <span>{data.value}</span>
            </Value>
          </List>
        ))}
      </Ul>
    </Container>
  );
}

const Container = styled.div`
  color: white;
`;

const Ul = styled.ul``;
const List = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const Key = styled.div`
  color: rgba(255, 255, 255, 0.7);
`;
const Value = styled.div`
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px 13px;
`;
