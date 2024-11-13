import styled from "styled-components";
import { ChangeEvent, useEffect } from "react";
import { useSearchStore } from "../../../store";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "../../shared/ButtonIcon";

export default function SearchBar() {
  const { searchKeyWord, setSearchKeyWord, searchMusic } = useSearchStore();

  useEffect(() => {
    searchMusic();
  }, [searchKeyWord]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchKeyWord(e.currentTarget.value);

  return (
    <Container>
      <InputWrap>
        <Input
          placeholder="검색어를 입력하세요."
          onChange={onChange}
          value={searchKeyWord}
        />
        {searchKeyWord ? (
          <ClearButton onClick={() => setSearchKeyWord("")}>x</ClearButton>
        ) : null}
        <ButtonIcon icon={faSearch} size="18px" />
      </InputWrap>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  border-bottom: 2px solid white;
  margin-bottom: 50px;
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;
const Input = styled.input`
  width: 80%;
  height: 25px;
  border: none;
  background: none;
  outline: none;
  font-size: 16px;
  color: white;
`;

const ClearButton = styled.button`
  color: rgba(255, 255, 255, 0.3);
  font-size: 18px;
  font-weight: bold;
`;
