import { memo, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import styled, { css } from "styled-components";
import { useClickAway } from "react-use";
import CancelIcon from "../assets/images/Cancel.svg";

/**
 * A component return a popup modal
 * @param {Object} props - required props
 * @param {boolean} props.modalState - State to determine when to show the modal, show when receive 'true'
 * @param {Function} props.onBlur - Fire this func when user click away from the modal
 * @param {JSX.Element} props.children - The content which will show in the modal
 * @param {string=} props.width - The width of the modal. 'width: max-content;' by default
 * @returns  modal component
 */
function CPModalPopup({ modalState, onBlur, children, width = "", bgColor }) {
  const divRef = useRef();

  useClickAway(divRef, () => {
    onBlur();
  });

  return (
    <Modal open={modalState}>
      <CSSTransition
        in={modalState}
        classNames="modal-popup"
        timeout={300}
        unmountOnExit
      >
        {/* ref={divRef} */}
        <Div width={width} ref={divRef} bgColor={bgColor}>
          {children}
        </Div>
      </CSSTransition>
    </Modal>
  );
}

export default memo(CPModalPopup);

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  outline: 0;
  opacity: 0;
  transition: all 0.15s linear;
  background: transparent;
  ${({ open }) =>
    open &&
    css`
      z-index: 1060;
      overflow-x: hidden;
      overflow-y: auto;
      display: flex;
      opacity: 1;
      background: #00000042;
    `}
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  cursor: default;
  max-width:65%;
  img {
    max-width: 90%;
  }

  &.modal-popup-enter {
    opacity: 0;
    transform: scale(0.7);
  }
  &.modal-popup-enter-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
    opacity: 1;
    transform: scale(1);
  }
  &.modal-popup-exit {
    opacity: 1;
    transform: scale(1);
  }
  &.modal-popup-exit-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
    opacity: 0;
    transform: scale(0.7);
  }
`;
