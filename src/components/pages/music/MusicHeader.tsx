import styled from "styled-components";
import { ButtonIcon } from "../../shared/ButtonIcon";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useGetMusicInfoById from "../../../hooks/useGetMusicInfoById";

export default function MusicHeader() {
  const navigate = useNavigate();
  const musicInfo = useGetMusicInfoById();

  return (
    <Container>
      <ButtonIcon icon={faChevronLeft} onClick={() => navigate(-1)} />
      <Title>{musicInfo?.title}</Title>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 40px 15px 40px;
  position: absolute;
  width: 90%;
  top: 70px;
  left: 22px;
  gap: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #121212;
`;

const Title = styled.div`
  width: 250px;
  color: white;
  font-size: 17px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

// 컴포넌트 스타일링 및 기능 개발
// hooks 폴더에서 페이지 별로 나눠야 할듯? 그게 더 관리하기 쉬움
// store 폴더에서 나눈것 처럼

// padding도 줘야할것 같고 스크롤을 감지하여 내렸을 때 제목 뜨고 border 적용
