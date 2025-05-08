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
`;

const Title = styled.div`
  color: white;
  font-size: 17px;
`;
