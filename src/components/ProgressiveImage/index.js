import React, { useEffect, useState } from "react";

const ProgressiveImage = ({
  placeholder,
  src = "",
  alt = "",
  style = {},
  className = "",
}) => {
  const [loading, setLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(placeholder);

  useEffect(() => {
    if (!placeholder) return;
    const imageToLoad = new Image();
    imageToLoad.src = src;
    imageToLoad.onload = () => {
      setCurrentSrc(src);
      setLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!placeholder)
    return <img src={src} style={style} alt={alt} className={className} />;

  return (
    <img
      src={currentSrc}
      style={{
        opacity: loading ? 0.5 : 1,
        transition: "opacity 0.15s linear",
        ...style,
      }}
      alt={alt}
      className={className}
    />
  );
};

export default ProgressiveImage;
