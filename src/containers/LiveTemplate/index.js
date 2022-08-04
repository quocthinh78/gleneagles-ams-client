import React, { Suspense } from "react";
import styled from "styled-components";
import CPSideBanner from "../../components/CPSideBanner";

export default function LiveLayout({ children }) {
  return (
    <PageContainer>
      <Container>
        <CPSideBanner />
        <Main>
          <MainContainer>
            <Suspense fallback={<Processing>Processing...</Processing>}>
              {children}
            </Suspense>
          </MainContainer>
        </Main>
      </Container>
    </PageContainer>
  );
}
const Processing = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  ${({ theme }) => theme.breakpoints.m} {
    flex-direction: row;
    width: 100%;
  }
`;
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Main = styled.div`
  position: relative;
  ${({ theme }) => theme.breakpoints.m} {
    flex: 1;
  }
`;

const MainContainer = styled.div`
  text-align: center;
  ${({ theme }) => theme.breakpoints.m} {
    overflow-y: auto;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
  }
`;
