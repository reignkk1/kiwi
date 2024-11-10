import { parserLocalStorage } from "parser-storages";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { useUserNameStore } from "../../store";
import { useNavigate } from "react-router-dom";

export default function Entry() {
  const [name, setName] = useState<string>("");
  const [show, setShow] = useState<boolean>(true);

  const navigate = useNavigate();
  const { setUserName } = useUserNameStore();

  useEffect(() => {
    if (parserLocalStorage.get("name")) {
      setShow(false);
    }
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onClick = () => {
    if (!name) {
      return alert("이름을 입력해주세요.");
    }
    parserLocalStorage.set("name", name);
    setUserName(name);
    setShow(false);
    navigate("/");
  };

  return show ? (
    <Container>
      <div>
        <input onChange={onChange} type="text" />
        <span>님, 안녕하세요</span>
      </div>
      <button onClick={onClick}>입장하기</button>
    </Container>
  ) : null;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  opacity: 0.9;
`;
