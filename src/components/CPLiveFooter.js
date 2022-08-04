import styled from "styled-components";
import Sponsor_1 from "../assets/images/sponsor-1.png";
import Sponsor_2 from "../assets/images/sponsor-2.jpg";
function CPLiveFooter() {
  return (
    <Container>
      <Title>Gold Sponsors</Title>
      <Sponsor>
        <Image>
          <img src={Sponsor_1} alt="Sponsor 1" />
        </Image>
        <Image>
          <img src={Sponsor_2} alt="Sponsor 2" />
        </Image>
      </Sponsor>
    </Container>
  );
}

export default CPLiveFooter;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  flex: 1;
  ${({ theme }) => theme.breakpoints.l} {
    margin-top: 0;
  }
`;
const Title = styled.h3`
  font-size: 12px;
  text-align: center;
  margin-bottom: 0px;
  margin-top: 5px;
  ${({ theme }) => theme.breakpoints.m} {
    font-size: 18px;
  }
  ${({ theme }) => theme.breakpoints.l} {
    font-size: 22px;
  }
  ${({ theme }) => theme.breakpoints.xl} {
    font-size: 24px;
  }
`;

const Sponsor = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Image = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    height: auto;
    width: 100%;
  }
  ${({ theme }) => theme.breakpoints.m} {
    width: unset;
    height: 100%;
    img {
      height: 60px;
      width: auto;
      margin: 0 1rem;
    }
  }
  ${({ theme }) => theme.breakpoints.l} {
    img {
      height: 80px;
      width: auto;
      margin: 0 1rem;
    }
  }
`;
