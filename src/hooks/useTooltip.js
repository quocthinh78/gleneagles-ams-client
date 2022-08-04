import styled from "styled-components";

// Bọc Tooptip bên ngoài tag cần tooltip. Thêm nội dung của tooltip bằng
// attr tooltip.
// eg: <Tooltip tooltip="ghi vào đây" >...</Tooltip>

export const Tooltip = styled.div.attrs((props) => ({
  children: [
    props.children,
    props.tooltip ? (
      <span key="tooltiptext" className="tooltiptext">
        {props.tooltip}
      </span>
    ) : (
      ""
    ),
  ],
}))`
  position: relative;
  display: inline-block;
  span.tooltiptext {
    visibility: hidden;
    width: max-content;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 10px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    opacity: 0;
    transition: opacity 0.3s;
    transform: translateX(-50%);
    font-size: 13px;
    line-height: normal;
    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #555 transparent transparent transparent;
    }
  }
  &:hover span.tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;
