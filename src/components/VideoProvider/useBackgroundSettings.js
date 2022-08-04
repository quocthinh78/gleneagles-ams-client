import { useCallback, useEffect, useState } from "react";
import {
  GaussianBlurBackgroundProcessor,
  VirtualBackgroundProcessor,
  ImageFit,
  isSupported,
} from "@twilio/video-processors";
import Abstract from "../../assets/images/videoBg/Abstract.jpg";
import AbstractThumb from "../../assets/images/videoBg/thumb/Abstract.jpg";
import BohoHome from "../../assets/images/videoBg/BohoHome.jpg";
import BohoHomeThumb from "../../assets/images/videoBg/thumb/BohoHome.jpg";
import Bookshelf from "../../assets/images/videoBg/Bookshelf.jpg";
import BookshelfThumb from "../../assets/images/videoBg/thumb/Bookshelf.jpg";
import CoffeeShop from "../../assets/images/videoBg/CoffeeShop.jpg";
import CoffeeShopThumb from "../../assets/images/videoBg/thumb/CoffeeShop.jpg";
import Contemporary from "../../assets/images/videoBg/Contemporary.jpg";
import ContemporaryThumb from "../../assets/images/videoBg/thumb/Contemporary.jpg";
import CozyHome from "../../assets/images/videoBg/CozyHome.jpg";
import CozyHomeThumb from "../../assets/images/videoBg/thumb/CozyHome.jpg";
import Desert from "../../assets/images/videoBg/Desert.jpg";
import DesertThumb from "../../assets/images/videoBg/thumb/Desert.jpg";
import Fishing from "../../assets/images/videoBg/Fishing.jpg";
import FishingThumb from "../../assets/images/videoBg/thumb/Fishing.jpg";
import Flower from "../../assets/images/videoBg/Flower.jpg";
import FlowerThumb from "../../assets/images/videoBg/thumb/Flower.jpg";
import Kitchen from "../../assets/images/videoBg/Kitchen.jpg";
import KitchenThumb from "../../assets/images/videoBg/thumb/Kitchen.jpg";
import ModernHome from "../../assets/images/videoBg/ModernHome.jpg";
import ModernHomeThumb from "../../assets/images/videoBg/thumb/ModernHome.jpg";
import Nature from "../../assets/images/videoBg/Nature.jpg";
import NatureThumb from "../../assets/images/videoBg/thumb/Nature.jpg";
import Ocean from "../../assets/images/videoBg/Ocean.jpg";
import OceanThumb from "../../assets/images/videoBg/thumb/Ocean.jpg";
import Patio from "../../assets/images/videoBg/Patio.jpg";
import PatioThumb from "../../assets/images/videoBg/thumb/Patio.jpg";
import Plant from "../../assets/images/videoBg/Plant.jpg";
import PlantThumb from "../../assets/images/videoBg/thumb/Plant.jpg";
import SanFrancisco from "../../assets/images/videoBg/SanFrancisco.jpg";
import SanFranciscoThumb from "../../assets/images/videoBg/thumb/SanFrancisco.jpg";
import { SELECTED_BACKGROUND_SETTINGS_KEY } from "../../constants";

const imageNames = [
  "Abstract",
  "Boho Home",
  "Bookshelf",
  "Coffee Shop",
  "Contemporary",
  "Cozy Home",
  "Desert",
  "Fishing",
  "Flower",
  "Kitchen",
  "Modern Home",
  "Nature",
  "Ocean",
  "Patio",
  "Plant",
  "San Francisco",
];

const images = [
  AbstractThumb,
  BohoHomeThumb,
  BookshelfThumb,
  CoffeeShopThumb,
  ContemporaryThumb,
  CozyHomeThumb,
  DesertThumb,
  FishingThumb,
  FlowerThumb,
  KitchenThumb,
  ModernHomeThumb,
  NatureThumb,
  OceanThumb,
  PatioThumb,
  PlantThumb,
  SanFranciscoThumb,
];

const rawImagePaths = [
  Abstract,
  BohoHome,
  Bookshelf,
  CoffeeShop,
  Contemporary,
  CozyHome,
  Desert,
  Fishing,
  Flower,
  Kitchen,
  ModernHome,
  Nature,
  Ocean,
  Patio,
  Plant,
  SanFrancisco,
];

let imageElements = new Map();

const getImage = (index) => {
  return new Promise((resolve, reject) => {
    if (imageElements.has(index)) {
      return resolve(imageElements.get(index));
    }
    const img = new Image();
    img.onload = () => {
      imageElements.set(index, img);
      resolve(img);
    };
    img.onerror = reject;
    img.src = rawImagePaths[index];
  });
};

export const backgroundConfig = {
  imageNames,
  images,
};

const virtualBackgroundAssets = "/virtualbackground";
let blurProcessor;
let virtualBackgroundProcessor;

export default function useBackgroundSettings(videoTrack, room) {
  const [backgroundSettings, setBackgroundSettings] = useState(() => {
    const localStorageSettings = window.localStorage.getItem(
      SELECTED_BACKGROUND_SETTINGS_KEY
    );
    return localStorageSettings
      ? JSON.parse(localStorageSettings)
      : { type: "none", index: 0 };
  });

  const removeProcessor = useCallback(() => {
    if (videoTrack && videoTrack.processor) {
      videoTrack.removeProcessor(videoTrack.processor);
    }
  }, [videoTrack]);

  const addProcessor = useCallback(
    (processor) => {
      if (!videoTrack || videoTrack.processor === processor) {
        return;
      }
      removeProcessor();
      videoTrack.addProcessor(processor);
    },
    [videoTrack, removeProcessor]
  );

  useEffect(() => {
    if (!isSupported) {
      return;
    }
    // make sure localParticipant has joined room before applying video processors
    // this ensures that the video processors are not applied on the LocalVideoPreview
    const handleProcessorChange = async () => {
      if (!blurProcessor) {
        blurProcessor = new GaussianBlurBackgroundProcessor({
          assetsPath: virtualBackgroundAssets,
        });
        await blurProcessor.loadModel();
      }
      if (!virtualBackgroundProcessor) {
        virtualBackgroundProcessor = new VirtualBackgroundProcessor({
          assetsPath: virtualBackgroundAssets,
          backgroundImage: await getImage(0),
          fitType: ImageFit.Cover,
        });
        await virtualBackgroundProcessor.loadModel();
      }
      if (!room?.localParticipant) {
        return;
      }

      if (backgroundSettings.type === "blur") {
        addProcessor(blurProcessor);
      } else if (
        backgroundSettings.type === "image" &&
        typeof backgroundSettings.index === "number"
      ) {
        virtualBackgroundProcessor.backgroundImage = await getImage(
          backgroundSettings.index
        );
        addProcessor(virtualBackgroundProcessor);
      } else {
        removeProcessor();
      }
    };
    handleProcessorChange();
    window.localStorage.setItem(
      SELECTED_BACKGROUND_SETTINGS_KEY,
      JSON.stringify(backgroundSettings)
    );
  }, [backgroundSettings, videoTrack, room, addProcessor, removeProcessor]);

  return [backgroundSettings, setBackgroundSettings];
}
