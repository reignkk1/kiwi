import styled from "styled-components";

export const ModalContainer = styled.div`
  width: 89%;
  height: 93%;
  left: 5%;
  top: 3%;
  z-index: 99;
  position: absolute;
  border-radius: 30px;
  @media only screen and (min-device-width: 360px) and (max-device-width: 479px) {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 0px;
  }
`;
