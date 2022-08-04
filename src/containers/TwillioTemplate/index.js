import React, { Suspense } from "react";
import styled from "styled-components";
import { VideoApp } from "../../context/VideoProvider";

export default function TwillioLayout({ children }) {
  return (
    <Container>
      <Suspense fallback={<Processing>Processing...</Processing>}>
        <VideoApp>{children}</VideoApp>
      </Suspense>
    </Container>
  );
}

const Processing = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
