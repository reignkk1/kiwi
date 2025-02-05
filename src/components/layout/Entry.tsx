import { parserLocalStorage } from "parser-storages";
import { ChangeEvent } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEntryStore } from "./hooks";

export default function Entry() {
  const navigate = useNavigate();
  const {
    state: { userName },
    action: { hiddenModal, setUserName },
  } = useEntryStore();

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUserName(e.currentTarget.value);

  const onClick = () => {
    if (!userName) {
      return alert("이름을 입력해주세요.");
    }
    parserLocalStorage.set("name", userName);
    hiddenModal();
    navigate("/");
  };

  return (
    <Container>
      <LogoContainer>
        <Title>음악이 필요한 순간</Title>
        <Logo>
          <span>Melon</span>
        </Logo>
      </LogoContainer>
      <InputContainer>
        <InputWrap>
          <input
            onChange={onChange}
            type="text"
            maxLength={4}
            value={userName}
          />
        </InputWrap>
        <span>님, 안녕하세요</span>
      </InputContainer>
      <button onClick={onClick}>입장하기</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: white;
  width: 89%;
  height: 93%;
  background-color: black;
  position: absolute;
  left: 5%;
  top: 3%;
  z-index: 99;
  border-radius: 30px;
  button {
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 10px 15px;
    width: 50%;
    font-size: 20px;
    font-weight: bold;
    border-radius: 10px;
  }
`;

const InputWrap = styled.div`
  border-bottom: 1px solid white;

  width: 90px;
  input {
    width: 100%;
    height: 50px;
    font-size: 20px;
    background: none;
    border: none;
    outline: none;
    color: white;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
`;

const Title = styled.h1`
  font-size: 20px;
`;

const Logo = styled.div`
  color: #00ea00;
  font-size: 40px;
  font-weight: bold;
  margin-top: 10px;
`;

const LogoContainer = styled.div`
  text-align: center;
`;
