import styled, { keyframes } from "styled-components";

function CPLoadingSpinners() {
  return (
    <Container>
      <Loader />
    </Container>
  );
}

export default CPLoadingSpinners;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  background: white;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 999999;
`;

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 6px solid #f3f3f3;
  border-top: 6px solid #555;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 2s linear infinite;
`;
