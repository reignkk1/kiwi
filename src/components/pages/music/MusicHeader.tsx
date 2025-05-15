import styled from "styled-components";
import { ButtonIcon } from "../../shared/ButtonIcon";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { getMusicDataFromId } from "../../../utils";

export default function MusicHeader() {
  const navigate = useNavigate();
  const { id } = useParams();
  const music = getMusicDataFromId(id);

  return (
    <Container>
      <ButtonIcon icon={faChevronLeft} onClick={() => navigate(-1)} />
      <Title>{music.title}</Title>
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
  z-index: 1;
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
