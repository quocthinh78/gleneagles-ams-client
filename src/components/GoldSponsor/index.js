import React from "react";
import styled from "styled-components";

import sponsorImg from "../../assets/images/Sponsor Logo.png";
import abbottLogo from "../../assets/images/Abbott_Logo.jpg";
import bayeLogo from "../../assets/images/Corp-Logo_BG_Bayer.png";
import abbVieLogo from "../../assets/images/AbbVieLogo.jpg";
import ArtelacLogo from "../../assets/images/Bausch+Lomb_TagLine-Logo.png";

const GoldSponsor = () => {
  return (
    /*<Sponsor> */
      /*{ <SponsorRowOne>
          <p>Platinum Sponsor</p>
      </SponsorRowOne> }*/
      <SponsorRowTwo>
        <Sponsor1>
          <p>Gold Sponsor</p>
          <ListSponsor1>
            <img src={ArtelacLogo} alt="ArtelacLogo" />
          </ListSponsor1>
        </Sponsor1>
        <Sponsor2>
          <p>Silver Sponsor</p>
          <ListSponsor2>
            <img src={abbottLogo} alt="abbottLogo" />
            <img src={abbVieLogo} alt="abbVieLogo" />
            <img src={bayeLogo} alt="bayeLogo" />
            <img src={sponsorImg} alt="sponsor" />
          </ListSponsor2>
        </Sponsor2>
      </SponsorRowTwo>
    /* </Sponsor> */
  );
};

export default GoldSponsor;

const Sponsor = styled.div`
`;

const SponsorRowOne = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-weight: 700;
  color: #00769c;
  padding: 1.5rem 0 0.5rem;
  p {
    font-family: MuseoSansRounded;
    font-weight: 700;
    font-size: 1.1rem;
    color: #00769c;
    margin-bottom: 10px;
  }
`;

const SponsorRowTwo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-weight: 700;
  color: #00769c;
  //padding-bottom: 1.5rem;
  padding: 1.5rem 0 1.5rem;
  p {
    font-family: MuseoSansRounded;
    font-weight: 700;
    font-size: 1.1rem;
    color: #00769c;
    margin-bottom: 10px;
  }
  ${({ theme }) => theme.breakpoints.l} {
    display: flex;
    flex-direction: inherit;
    align-items: flex-start;
    justify-content: center;
  }
`;

const ListSponsor1 = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-bottom: 2rem;
  gap: 20px;
  gap: 30px;
  height: 90px;
  display: flex;
  align-items: center;
  img {
    max-width: 180px;
  }
  ${({ theme }) => theme.breakpoints.l} {
    gap: 30px;
    padding-bottom: 0;
    img {
      width: 180px;
      height: auto;
      object-fit: fill;
    }
  }
`;

const ListSponsor2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  gap: 30px;
  height: 90px;
  display: flex;
  align-items: center;
  img {
    max-width: 70px;
  }
  ${({ theme }) => theme.breakpoints.l} {
    img {
      width: 140px;
      height: auto;
      object-fit: fill;
    }
  }
`;

const Sponsor1 = styled.div`
  width: 100%;
  ${({ theme }) => theme.breakpoints.l} {
    width: 50%;
  }
`;

const Sponsor2 = styled.div`
  width: 100%;
  ${({ theme }) => theme.breakpoints.l} {
    width: 50%;
  }
`;

