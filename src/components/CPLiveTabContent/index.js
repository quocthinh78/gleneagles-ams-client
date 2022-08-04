import styled from "styled-components";
import CPDownloadContent from "./CPDownloadContent";
import CPPollContent from "./CPPollContent";
import CPQuestionContent from "./CPQuestionContent";
import CPAgendaContent from "./ChildCP/CPAgendaContent";
import CPChatForMobile from "./CPChatForMobile";
import CPPollVoteShareHand from "./CPPollVoteShareHand";
// import { useMedia } from "react-use";
import CPInquiryContent from "./CPInquiryContent";

function CPLiveTabContent({ activeTab, pause_chat }) {
  // const isMobileSize = useMedia("(max-width: 991px)");
  const isMobileSize = true;

  return (
    <MainContent>
      <Wrapper>
        <CPQuestionContent activeTab={activeTab === "qna"} />
        <CPPollVoteShareHand activeTab={activeTab === "vote"} />
        <CPPollContent activeTab={activeTab === "poll"} />
        <CPDownloadContent activeTab={activeTab === "download"} />
        <CPAgendaContent activeTab={activeTab === "agenda"} />
        <CPInquiryContent activeTab={activeTab === "inquiry"} />

        {isMobileSize && (
          <CPChatForMobile
            activeTab={activeTab === "chat"}
            pause_chat={pause_chat}
          />
        )}
      </Wrapper>
    </MainContent>
  );
}

export default CPLiveTabContent;

const MainContent = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
  overflow: hidden;
  ${({ theme }) => theme.breakpoints.l} {
    height: 100%;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
`;
