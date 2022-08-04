import React from "react";
import styled from "styled-components";
import { Container, makeStyles } from "@material-ui/core";
import banner from "../../../assets/images/gleneagles-hospital.png";
import GoldSponsor from "../../../components/GoldSponsor";
import imgEmailHeader from "../../../assets/images/email-Header.jpg";
import imgEmailBody from "../../../assets/images/email-Body.jpg";
import imgEmailMap from "../../../assets/images/email-Map.jpg";
import imgEmailBottom from "../../../assets/images/email-Bottom.jpg";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: "2.5rem",
    marginBottom: "0.5rem",
    color: "#36a1c1",
    fontSize: "1.6rem",
    fontWeight: 700,
    width: "90%",
    [theme.breakpoints.up("md")]: {
      fontSize: "1.8rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "2.5rem",
    },

    "& a": {
      transition: "none",
    },
    "& a:hover": {
      color: "#36a1c1",
      textDecoration: "underline",
    },
  },
  body: {
    width: "90%",
  },
}));

const AboutPage = () => {
  const classes = useStyles();

  return (
    <MainContainer>
      <Main>
        <Img src={banner} alt="banner" />
        <Container className={classes.title}>
          <a
            href="https://www.gleneagles.com.sg/"
            target="_blank"
            rel="noreferrer"
          >
            Gleneagles Hospital
          </a>
        </Container>
        <Container className={classes.body}>
          <Headline>
            <span>On your side</span>
          </Headline>
          <Text>
            Gleneagles Hospital is the first private hospital in Singapore and
            is also the flagship for the 13 Gleneagles hospitals located
            globally.
            <br />
            <br />
            “Gleneagles” was the name of a boarding house located along Napier
            Road in the 1930s. The name represents the lush surroundings and
            wilderness of a beautiful Scottish valley.
            <br />
            <br />
            In the 1950s, a six-storey luxury hotel called Gleneagles Hotel was
            built next to the boarding house. The hotel was taken over in 1958
            by the British European Association to be used as a hospital, mainly
            for expatriates. It was well known for providing Women’s Health
            services. On 8 June 1959, Gleneagles Hospital opened its doors to
            the public.
            <br />
            <br />
            The former boarding house was renamed Macauley House, which was
            redeveloped into a 5-storey medical block in 1978. From 1979 to
            1980, it expanded into a 126-bed medical centre. Parkway Holdings
            acquired Gleneagles Hospital on May 1987. From 1988 to 1991, it was
            expanded into a 10-storey modern hospital, with a wider range of
            services. From 1993 to 1994, Gleneagles transformed into a
            full-fledged hospital with 150 medical specialists. <br />
            <br />
            Located next to Singapore Botanic Gardens – Singapore’s first UNESCO
            World Heritage Site, Gleneagles Hospital provides the ideal healing
            environment for patients. The 221-bed hospital today provides a wide
            range of services, as well as medical and surgical specialties. By
            2022 a new MRT station (Napier Station) will offer patients and
            families better access to Gleneagles Hospital.
          </Text>
        </Container>
      </Main>
      <GoldSponsor />
      <EmailImg src={imgEmailHeader} alt="imgEmailHeader" />
      <EmailImg src={imgEmailBody} alt="imgEmailBody" />
      <EmailImg src={imgEmailMap} alt="imgEmailMap" />
      <EmailImg src={imgEmailBottom} alt="imgEmailBottom" />
    </MainContainer>
  );
};

export default AboutPage;

const EmailImg = styled.img`
  display: none;
`;

const MainContainer = styled.div`
  width: 100%;
  position: relative;
  font-family: MuseoSans;
  font-weight: 300;
`;

const Main = styled.div`
  background: linear-gradient(180deg, #faffff 0, #accbd6);
  text-align: start;
  padding-bottom: 5rem;
`;

const Img = styled.img`
  display: block;
  width: 100%;
`;

const Headline = styled.div`
  color: #00769c;
  font-weight: 700;
  font-size: 22px;
  margin-bottom: 1rem;
  ${({ theme }) => theme.breakpoints.xl} {
    font-size: 24px;
  }
  ${({ theme }) => theme.breakpoints.sl} {
    font-size: 26px;
  }
`;

const Text = styled.div`
  color: #015571;
  font-weight: 300;
  font-size: 16px;
  line-height: 25px;
  ${({ theme }) => theme.breakpoints.xl} {
    font-size: 18px;
  }
  ${({ theme }) => theme.breakpoints.sl} {
    font-size: 20px;
  }
`;
