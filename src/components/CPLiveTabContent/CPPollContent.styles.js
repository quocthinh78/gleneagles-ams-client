import styled, { css } from "styled-components";

export const Container = styled.div`
  position: relative;
  background: #F16577;
  margin: 0;
  height: 450px;
  flex: 1;
  display: flex;
  flex-direction: column;
  .emoji-picker-react {
    position: absolute;
    right: 0;
    width: 100%;
    bottom: 17%;
  }
  ${(props) =>
    !props.$activeTab &&
    css`
      display: none;
    `}
`;


