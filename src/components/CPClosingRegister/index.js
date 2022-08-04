/* eslint-disable no-mixed-operators */
import React from "react";
import styled from "styled-components";



export default function Index() {
    return (
        <Container>
            <Title>RSVP is now closed.</Title>
            <Text>Kindly contact <a href="mailto:pvpa@nvpc.org.sg">pvpa@nvpc.org.sg</a> for further assistance. Thank you.</Text>
        </Container>
    )
}

const Container = styled.div`
    text-align: left;
    padding: 20px;
`;
const Title = styled.h3`
    font-family: "GoThicB";
    font-size: 28px;
    color: #1b3862;
`;
const Text = styled.div`
    color: #1b3862;
    a{
        color: #F16577;
        cursor: pointer;
    }
`   ;
