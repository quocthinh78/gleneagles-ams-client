import React from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import goldSponsor from "../../assets/images/Gold_Sponsor_Sandoz.svg";
import ArtelacLogo from "../../assets/images/Artelac.jpg";

const SplideLogo = () => {
    return (
        <SplideList>
            <Splide
                options={{
                    type: "loop",
                    pagination: false,
                    autoplay: true,
                }}
                >
                <SplideSlide>
                    <div>
                        <a href="https://www.bausch.com.sg/en/our-products/pharmaceuticals/dry-eye-products/" target="_blank" rel="noopener noreferrer">
                            <img
                                src={ArtelacLogo}
                                alt="Artelac Logo"
                            />
                        </a>
                    </div>
                </SplideSlide>
            </Splide>
        </SplideList>
    );
};

export default SplideLogo;

const SplideList = styled.div`
    display: flex;
    margin: 2.5rem 0;
    justify-content: center;

    .splide {
        width: 300px;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .splide__slide img {
        width: 100%;
        height: auto;
        object-fit: cover;
        ${({ theme }) => theme.breakpoints.sl} {
            width: 300px;
            height: 120px;
        }
    }
      
    .splide__slide {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
`;