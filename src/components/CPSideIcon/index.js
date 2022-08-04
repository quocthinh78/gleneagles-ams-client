import React from 'react'
import styled from "styled-components";

import logo1 from "../../assets/images/logo4.png";
import logo2 from "../../assets/images/logo3.png";
import logo3 from "../../assets/images/logo2.png";
import logo4 from "../../assets/images/logo1.png";

export default function CPSideIcon() {
    return (
        <LeftSideGroup>
            <LeftSideImage src={logo1} />
            <LeftSideImage src={logo2} />
            <LeftSideImage src={logo3} />
            <LeftSideImage src={logo4} />
        </LeftSideGroup>
    )
}

const LeftSideGroup = styled.div`
    width: 15%;
    display: none;
    ${({ theme }) => theme.breakpoints.l} {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
  }
 `
const LeftSideImage = styled.img`
    width: 100%;
    height: auto;
    max-height: 150px;
`