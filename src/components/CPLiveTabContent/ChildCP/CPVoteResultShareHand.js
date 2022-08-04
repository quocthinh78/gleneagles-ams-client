import React, { Fragment } from 'react'
import styled from "styled-components"

const CPVoteResultShareHand = ({ agreeTotal, againstTotal, abstainTotal, active }) => {

    console.log(agreeTotal, againstTotal, agreeTotal)

    const renderForAndAgainstCol = (type, forTotal, againstTotal) => {
        const persentage =
            type === "for"
                ? ((parseInt(forTotal) / (parseInt(forTotal) + parseInt(againstTotal))) * 100).toFixed(2)
                : ((parseInt(againstTotal) / (parseInt(forTotal) + parseInt(againstTotal))) * 100).toFixed(2);
        return (
            <div style={{ display: 'flex', flexDirection: '', alignContent: 'center', justifyContent: 'center' }}>
                <div className="number"> {type === "for" ? (forTotal + " ") : (againstTotal + " ")}</div>
                <div className="percent">({persentage}%)</div>
            </div>
        );
    };
    return (
        <Container>
            {active === 3 && (
                <>
                    <FlexRow>
                        <ItemLeft>For</ItemLeft>
                        <ItemRight>{renderForAndAgainstCol("for", agreeTotal, againstTotal)}</ItemRight>
                    </FlexRow>
                    <FlexRow>
                        <ItemLeft>Against</ItemLeft>
                        <ItemRight>{renderForAndAgainstCol("against", agreeTotal, againstTotal)}</ItemRight>
                    </FlexRow>
                    <FlexRow>
                        <ItemLeft>Abstain</ItemLeft>
                        <ItemRight>{abstainTotal}</ItemRight>
                    </FlexRow>
                </>)}

        </Container>
    )
}

export default CPVoteResultShareHand

const Container = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    margin: 0 auto;
    width: 70%;

    ${({ theme }) => theme.breakpoints.l} {
    width: 50%;
  }
`
const FlexRow = styled.div`
    display: flex;
    align-items: center;
    column-gap: 50px;
`
const ItemLeft = styled.div``
const ItemRight = styled.div`
    margin-left: auto;
 
`