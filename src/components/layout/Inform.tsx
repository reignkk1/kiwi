import styled from "styled-components";
import { palette } from "../../constant";
import { ModalContainer } from "./ModalContainer";
import { useInformModalStore } from "../../store/layout/useInfoModalStore";
import { useShallow } from "zustand/react/shallow";
import { useSelectedMusicIndexStore } from "../../store/drawer";
import usePlaylistResolver from "../../hooks/usePlaylistResolver";

export default function Inform() {
  const setIsShowInformModal = useInformModalStore(
    (state) => state.setIsShowInformModal
  );

  const [selectedMusicIndex, setSelectedMusicIndex] =
    useSelectedMusicIndexStore(
      useShallow((state) => [
        state.selectedMusicIndex,
        state.setSelectedMusicIndex,
      ])
    );

  const {
    category,
    playListIds,
    setPlayListIds,
    playingIndex,
    setPlayingIndex,
  } = usePlaylistResolver();

  const onClickCancle = () => setIsShowInformModal(false);

  const onClickSubmit = () => {
    setPlayListIds(
      playListIds.filter((_, i) => !selectedMusicIndex.includes(i))
    );

    if (playingIndex) {
      setPlayingIndex(
        playingIndex - selectedMusicIndex.filter((i) => i < playingIndex).length
      );
    }

    setSelectedMusicIndex([]);
    setIsShowInformModal(false);
  };

  return (
    <Container>
      <Modal>
        <Content>
          <Title>안내</Title>
          <Text>
            {selectedMusicIndex.length} 곡을 {category}에서 삭제하시겠습니까?
          </Text>
        </Content>
        <Buttons>
          <button onClick={onClickCancle}>취소</button>
          <button onClick={onClickSubmit}>확인</button>
        </Buttons>
      </Modal>
    </Container>
  );
}

const Container = styled(ModalContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
`;

const Modal = styled.div`
  background-color: #1c1c1c;
  border-radius: 10px;
`;
const Title = styled.div`
  font-size: 20px;
  margin-bottom: 15px;
`;
const Text = styled.div`
  width: 150px;
  line-height: 1.5;
`;
const Content = styled.div`
  text-align: center;
  padding: 20px 50px;
`;
const Buttons = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  button {
    width: 50%;
    font-size: 16px;
    color: White;
    padding: 15px 0px;
  }

  button:first-child {
    color: rgba(255, 255, 255, 0.4);
  }

  button:last-child {
    color: ${palette.signatureColor};
  }
`;
