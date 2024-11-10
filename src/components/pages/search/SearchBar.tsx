import {
  faEllipsisV,
  faPlay,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { musicStore } from "../../../store";
import { MusicType } from "../../../types";

export default function SearchBar() {
  const [keyWord, setKeyWord] = useState("");
  const [result, setResult] = useState<MusicType[]>();
  const { getIncludedMusic } = musicStore;

  useEffect(() => {
    if (keyWord) {
      setResult(getIncludedMusic(keyWord.replaceAll(" ", "")));
    } else {
      setResult([]);
    }
  }, [keyWord]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyWord(e.currentTarget.value);
  };

  const onClickClearButton = () => {
    setKeyWord("");
  };
  return (
    <>
      <Container>
        <InnerWrap>
          <Input onChange={onChange} value={keyWord} />
          {keyWord ? (
            <ClearButton onClick={onClickClearButton}>x</ClearButton>
          ) : null}
          <SearchButton>
            <FontAwesomeIcon icon={faSearch} />
          </SearchButton>
        </InnerWrap>
      </Container>
      <ul>
        {result?.map(({ title, singer, imgSrc }) => (
          <List>
            <MusicInfo>
              <div>
                <Img src={imgSrc} />
              </div>
              <Info>
                <Title>{title}</Title>
                <Singer>{singer}</Singer>
              </Info>
            </MusicInfo>
            <div>
              <button>
                <FontAwesomeIcon icon={faPlay} />
              </button>
              <button>
                <FontAwesomeIcon icon={faEllipsisV} />
              </button>
            </div>
          </List>
        ))}
      </ul>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  border-bottom: 2px solid white;
`;

const InnerWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;
const Input = styled.input`
  width: 80%;
  border: none;
  background: none;
  outline: none;
  font-size: 16px;
  color: white;
`;

const List = styled.li`
  display: flex;
`;

const MusicInfo = styled.div`
  display: flex;
`;

// 재생버튼, 메뉴버튼 스타일링

const ClearButton = styled.button`
  color: rgba(255, 255, 255, 0.3);
  font-size: 18px;
  font-weight: bold;
`;

const SearchButton = styled.button`
  font-size: 20px;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
`;

const Info = styled.div``;
const Title = styled.div``;
const Singer = styled.div``;
