import styled from "styled-components";

export const ParticipantContent = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  outline: ${({ dominant }) => (dominant ? "3px solid red" : "none")};
`;

export const Indentity = styled.div`
  color: white;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1.5px;
  border-radius: 4px;
  background: #808080bf;
  padding: 8px;
  bottom: 10px;
  left: 10px;
  z-index: 1;
  position: absolute;
  max-width: 20%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Audio = styled.div`
  color: white;
  font-size: 20px;
  height: 30px;
  width: 30px;
  bottom: 10px;
  right: 10px;
  z-index: 1;
  position: absolute;
`;
