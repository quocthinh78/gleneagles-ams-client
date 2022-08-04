import styled from "styled-components";
import { backgroundConfig } from "../VideoProvider/useBackgroundSettings";
import BackgroundThumbnail from "./BackgroundThumbnail";

function BackgroundSelectionDialog({ active }) {
  const imageNames = backgroundConfig.imageNames;
  const images = backgroundConfig.images;

  return (
    <Container active={active}>
      <Title>
        <div>Backgrounds</div>
      </Title>
      <Body>
        <BackgroundThumbnail thumbnail={"none"} name={"None"} />
        <BackgroundThumbnail thumbnail={"blur"} name={"Blur"} />
        {images.map((image, index) => (
          <BackgroundThumbnail
            thumbnail={"image"}
            name={imageNames[index]}
            index={index}
            imagePath={image}
            key={image}
          />
        ))}
      </Body>
    </Container>
  );
}

export default BackgroundSelectionDialog;

const Container = styled.div`
  position: relative;
  border-radius: 8px;
  background: white;
  height: 100%;
  border: 1px solid #f1f3f4;
  display: ${({ active }) => (active ? "flex" : "none")};
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.div`
  height: 64px;
  min-height: 64px;
  padding-left: 24px;
  align-items: center;
  display: flex;

  font-size: 1.125rem;
  font-weight: 600;
`;

const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  flex: 1;
  padding: 20px 5px;
`;
