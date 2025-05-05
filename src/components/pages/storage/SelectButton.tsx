import styled from "styled-components";

interface SelectCircleProps {
  onClick: () => void;
  $active: boolean;
}

export default function SelectButton({ onClick, $active }: SelectCircleProps) {
  return $active ? (
    <EmojiButton onClick={onClick}>✅</EmojiButton>
  ) : (
    <EmptyButton onClick={onClick} />
  );
}

const Button = styled.div`
  width: 17px;
  height: 17px;
  cursor: pointer;
`;

const EmptyButton = styled(Button)`
  border-radius: 20%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-left: 2px;
`;

const EmojiButton = styled(Button)`
  font-size: 16px;
`;
