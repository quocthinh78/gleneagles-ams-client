import { DownloadOutlined } from "@ant-design/icons";
import { useMediaDevices } from "react-use";
import styled, { css } from "styled-components";

function CPDownloadContent({ activeTab }) {
  const test = useMediaDevices();

  console.log("MediaDevice: ", test);
  return (
    <Container $activeTab={activeTab}>
      <h2>Download Content</h2>
      <a href="/dummy.pdf" download="dummy.pdf">
        <DownloadOutlined />
        &nbsp;Download pdf file
      </a>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  height: 100%;
  width: 100%;
  ${(props) =>
    !props.$activeTab &&
    css`
      display: none;
    `}
`;

export default CPDownloadContent;
