import React, { useEffect, useState, memo } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
import Countdown, { zeroPad } from "react-countdown";
import loginBgRight from "../../assets/images/logo_gleneagles.png";
import apiInstance from "../../services";
import useUser from "../../hooks/useUser";
import socket from "../../services/socket";
// import { useKey } from "react-use";

SwiperCore.use([Pagination]);

const CPNetworkingSlides = memo(() => {
  const [swiper, setSwiper] = useState(null);
  const [data, setData] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const user = useUser();

  useEffect(() => {
    if (swiper && data && swiper.activeIndex !== pageIndex) {
      swiper.slideTo(pageIndex);
    }
  }, [pageIndex]);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const res = await apiInstance.get(
          `group/get-group-slides/${user.data.group_id}`
        );
        console.log(res.data);
        setData(res.data.slides);
        setPageIndex(res.data.currentSlide);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGroupData();
  }, []);

  useEffect(() => {
    if (!swiper) return;
    console.log(swiper);
    socket.on("change-slide", (a) => {
      console.log("socket change slide index: ", a);
      swiper.slideTo(a);
    });

    return () => {
      socket.removeAllListeners("change-slide");
    };
  }, [swiper]);

  const broadcastChangeSlide = async (page) => {
    try {
      const { data } = await apiInstance.post(
        `group/change-slide/${user.data.group_id}`,
        { currentId: page }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const goPrevSlide = (index) => {
    if (index <= 0) return;
    broadcastChangeSlide(index - 1);
    swiper.slidePrev();
  };

  const goNextSlide = (index) => {
    if (index + 1 >= data.length) return;
    broadcastChangeSlide(index + 1);
    swiper.slideNext();
  };

  // const goToSlide = (index) => {
  //   if (index + 1 >= data.length || index <= 0) return;
  //   broadcastChangeSlide(index);
  //   swiper.slideTo(index);
  // };

  // useKey("ArrowRight", () => goNextSlide(pageIndex));
  // useKey("ArrowDown", () => goNextSlide(pageIndex));
  // useKey("PageDown", () => goNextSlide(pageIndex));
  // useKey("n", () => goNextSlide(pageIndex));
  // useKey(" ", () => goNextSlide(pageIndex));

  // useKey("ArrowLeft", () => goPrevSlide(pageIndex));
  // useKey("ArrowUp", () => goPrevSlide(pageIndex));
  // useKey("PageUp", () => goPrevSlide(pageIndex));
  // useKey("p", () => goPrevSlide(pageIndex));
  // useKey("Backspace", () => goPrevSlide(pageIndex));

  return (
    <Slides>
      <SlidesWrapper>
        <Swiper
          pagination={{
            type: "progressbar",
          }}
          slidesPerView={1}
          allowTouchMove={false}
          className="group_slides"
          onSwiper={setSwiper}
          onSlideChange={(e) => {
            setPageIndex(e.activeIndex);
          }}
        >
          {data?.map((item, idx) => (
            <SwiperSlide
              key={"group_slides_" + idx}
              onClick={() => goNextSlide(pageIndex)}
            >
              <img src={item.url} alt="group slide image" />
            </SwiperSlide>
          ))}
        </Swiper>
      </SlidesWrapper>

      <Control>
        {!user.data?.is_judge && (
          <PageCtrl>
            <PageCtrlBtn onClick={() => goPrevSlide(pageIndex)}>
              <i className="fas fa-chevron-left"></i>
            </PageCtrlBtn>

            <PageNum>{pageIndex + 1}</PageNum>

            <PageCtrlBtn onClick={() => goNextSlide(pageIndex)}>
              <i className="fas fa-chevron-right"></i>
            </PageCtrlBtn>
          </PageCtrl>
        )}
        <Info>
          <Logo>
            <img src={loginBgRight} alt="logo" />
          </Logo>
          <TeamName>Winner Team</TeamName>
          <CountDownWrapper>
            <ReactCountdown />
          </CountDownWrapper>
        </Info>
      </Control>
    </Slides>
  );
});

const ReactCountdown = memo(() => {
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <h1>Time up</h1>;
    } else {
      // Render a countdown
      return (
        <h1>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </h1>
      );
    }
  };

  return <Countdown date={Date.now() + 1200000} renderer={renderer} />;
});

export default CPNetworkingSlides;

const Slides = styled.div`
  width: 100%;
  /* height: 100vh; */
  /* overflow: auto; */
  height: 100%;
`;

const SlidesWrapper = styled.div`
  /* height: auto; */
  width: 100%;
  background: black;
  height: 50vh;
  ${({ theme }) => theme.breakpoints.l} {
    height: calc(100vh - 10rem);
  }

  .swiper-container {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: black;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;

    ${({ theme }) => theme.breakpoints.l} {
      align-items: center !important;
    }
  }

  .swiper-pagination-progressbar {
    top: unset;
    bottom: 0;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Control = styled.div`
  /* min-height: 10rem; */
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  ${({ theme }) => theme.breakpoints.l} {
    flex-direction: row;
  }
`;

const PageCtrl = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  /* margin: auto; */
  margin-bottom: 10px;
  border-radius: 9999px;
  background: #f1f3f466;
  padding: 4px;
  transition: opacity 250ms linear, background 250ms linear, bottom 250ms linear;
  box-shadow: 0 1px 2px rgb(60 64 67 / 30%), 0px 2px 6px rgb(60 64 67 / 15%);
  width: max-content;
`;

const PageCtrlBtn = styled.button`
  background: transparent;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 15px;
  :hover {
    background: white;
  }
`;

const PageNum = styled.div`
  background: white;
  border: none;
  border-radius: 999px;
  padding: 0 20px;
  text-align: center;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
`;

const Info = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: fit-content;
  /* margin: auto; */
`;

const Logo = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border-style: solid;
  border-color: teal;
  border-width: 2px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const TeamName = styled.div`
  margin-left: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const CountDownWrapper = styled.div`
  margin-left: 30px;
  h1 {
    font-size: 54px;
    margin-bottom: 0;
  }
`;
