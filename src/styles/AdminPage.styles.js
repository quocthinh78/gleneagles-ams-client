import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

//-------- Reuse in different pages ----------
export const TitleBox = styled.div`
  height: 85px;
  display: flex;
  align-items: center;
  div {
    flex-grow: 1;
    padding: 0 15px;
  }
  div.right {
    text-align: end;
    color: #adb5bd;
    font-size: 0.9rem;
  }
`;
export const Button = styled.button`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid #00bfb2;
  padding: 0.45rem 0.9rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.15rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff;
  background-color: #00bfb2;
  background: linear-gradient(315deg, #00bfb2 0%, #028090 74%);
  box-shadow: 0 1px 4px 0 rgba(0, 191, 178, 0.5);
  margin-right: 5px;
  :hover {
    border-color: #028090;
    cursor: pointer;
  }
`;
export const DeleteButton = styled.button`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid #ff4b2b;
  padding: 0.45rem 0.9rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.15rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff;
  background-color: #ff4b2b;
  background: linear-gradient(to right, #ff416c, #ff4b2b);
  box-shadow: 0 1px 4px 0 rgba(255, 75, 43, 0.5);
  margin-right: 5px;
  :hover {
    border-color: #ff416c;
    cursor: pointer;
  }
`;
export const MainTable = styled.div`
  padding: 1.5rem;
  border: none;
  box-shadow: 0 0 35px 0 rgba(154, 161, 171, 0.3);
  margin-bottom: 30px;

  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #6c757d;
  text-align: left;
  ${(props) =>
    props.isLoading
      ? css`
          cursor: progress;
        `
      : ""}
`;
export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const Col_6 = styled.div`
  flex: 50%;
  max-width: 50%;
  &.right {
    display: flex;
    justify-content: flex-end;
  }
`;
export const Col_12 = styled.div`
  flex: 100%;
  width: 100%;
  &.right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #98a6ad;
  }
`;
export const SelectField = styled.div`
  height: 28px;
  width: max-content;
  position: relative;
  select {
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 4px;
    height: 28px;
    padding-left: 8px;
    padding-right: 15px;
    appearance: none;
    cursor: pointer;
  }
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    select {
      padding-right: 18px;
    }
  }
  ::after {
    content: "<>";
    font: 11px "Consolas", monospace;
    color: #333;
    transform: rotate(90deg) translateX(-50%);
    right: 4px;
    top: 50%;
    padding: 0 0 0px;
    border-bottom: 1px solid #ddd;
    position: absolute;
    pointer-events: none;
  }
`;

export const FuncBtn = styled.a`
  cursor: pointer;
  color: #727cf5;
  font-size: 0.86rem;
  :hover {
    color: #2b3af0;
  }
`;

export const Param = styled.p`
  color: #98a6ad;
  font-size: 14px;
  margin-bottom: 2.25rem;
`;

export const DataTable = styled.div`
  overflow: hidden;
  position: relative;
  border: 0px none;
  width: 100%;
`;

export const TableLength = styled.div`
  display: flex;
  justify-content: space-between;
  label,
  div {
    font-weight: 400;
    text-align: left;
    white-space: nowrap;
    line-height: 1.5;
    color: #6c757d;
    font-size: 0.86rem;
  }
  select {
    width: auto;
    display: inline-block;
  }
`;
export const SearchBox = styled.div`
  input {
    margin-left: 0.5em;
    display: inline-block;
    width: auto;
    outline-offset: -2px;
    appearance: none;
    padding: 3px;
    :focus {
      outline: none;
    }
  }
`;

export const TableWrapper = styled.div`
  position: relative;
  overflow: auto;
  width: 100%;
`;

export const Table = styled.table`
  width: ${(props) => (props.fullwidth ? "100%" : "max-content")};
  min-width: max-content;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const DataTable_head = styled.thead`
  width: max-content;
  > tr > th {
    box-sizing: content-box;
    border-top: 1px solid #e3eaef;
    border-bottom: 2px solid #e3eaef;
    vertical-align: middle;
    cursor: pointer;
    position: relative;
    padding: 0.95rem;
    padding-right: 30px;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    color: #6c757d;
    font-weight: bold;
    /* ${(props) =>
      !props.noArrow &&
      css`
        ::before,
        ::after {
          position: absolute;
          bottom: 0.9em;
          display: block;
          opacity: 0.3;
        }
        ::before {
          font-size: 1rem;
          top: 11px;
          right: 1em;
          content: "\\2191";
        }
        ::after {
          right: 0.5em;
          content: "\\2193";
          top: 6px;
          font-size: 1rem;
        }

        &.ascending ::before {
          opacity: 1;
        }
        &.descending ::after {
          opacity: 1;
        }
      `} */
  }
`;

export const DataTable_body = styled.tbody`
  position: relative;
  padding: 0.95rem;
  vertical-align: top;
  tr:nth-child(odd) {
    background: #f9f9f9;
  }
  .highlight {
    background: linear-gradient(to right, #1d976c, #93f9b9) !important;
    td {
      color: #f9f9f9;
    }
  }
  td {
    box-sizing: content-box;
    padding: 0.95rem;
    vertical-align: top;
    border-top: none;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    color: #6c757d;
    text-align: left;
    border-bottom: 1px solid #e3eaef;
    a {
      color: #727cf5;
      font-size: 0.9rem;
      :hover {
        color: #2b3af0;
      }
    }
  }
`;
export const TableInfo = styled.div`
  padding-top: 0.85em;
  white-space: nowrap;
  font-weight: 400;
  line-height: 1.5;
  color: #6c757d;
  text-align: left;
  font-size: 0.86rem;
`;
export const H4 = styled.h4`
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: 0.875rem;
  margin-top: 0;
  color: #6c757d;
`;
export const RefreshBtn = styled.div`
  color: #6c757d;
  font-size: 0.6rem;
  word-spacing: 2px;
  cursor: pointer;
  width: max-content;
  i {
    margin-right: 5px;
  }
`;
export const TablePagination = styled.div`
  white-space: nowrap;
  text-align: right;
`;
export const PaginateBtn = styled.a`
  color: #727cf5;
  text-decoration: none;
  font-size: 0.8rem;
  margin: 0 5px;
  cursor: pointer;
  &.active {
    font-weight: bold;
  }
  &.disabled {
    cursor: default;
  }
  :hover {
    color: #2b3af0;
  }
`;
export const TableNext = styled(PaginateBtn)`
  margin-left: 10px;
  cursor: pointer;
  font-size: 0.6rem;
`;
export const TablePrev = styled(PaginateBtn)`
  margin-right: 10px;
  cursor: pointer;
  font-size: 0.6rem;
`;

export const EditLink = styled.button`
  color: #98a6ad;
  font-size: 1.1rem;
  display: inline-block;
  padding: 0 3px;
  max-height: 30px;
  border: none;
  background: transparent;
  cursor: pointer;
  :hover {
    color: #6c757d;
  }
`;
export const DeleteLink = styled.button`
  color: #98a6ad;
  font-size: 1.1rem;
  display: inline-block;
  padding: 0 6px;
  max-height: 30px;
  border: none;
  background: transparent;
  cursor: pointer;
  :hover {
    color: #6c757d;
  }
`;
export const LockLink = styled.button.attrs((props) => ({
  className: props.tooltip ? "tooltip" : "",
  children: props.locked ? (
    <>
      {props.tooltip && <span className="tooltiptext">{props.tooltip}</span>}
      <i className="fas fa-lock"></i>
    </>
  ) : (
    <>
      {props.tooltip && <span className="tooltiptext">{props.tooltip}</span>}
      <i className="fas fa-unlock-alt"></i>
    </>
  ),
}))`
  color: ${(props) => (props.locked ? "#de524c" : "#0acf97")};
  font-size: 1rem;
  display: inline-block;
  padding: 0 3px;
  max-height: 30px;
  border: none;
  background: transparent;
  cursor: pointer;
  margin-left: 7px;
`;

export const TogglePlayButton = styled.button.attrs((props) => ({
  className: props.tooltip ? "tooltip" : "",
  children:
    props.play === 1 ? (
      <>
        {props.tooltip && <span className="tooltiptext">{props.tooltip}</span>}
        <i className="fa fa-play-circle"></i>
      </>
    ) : props.play === 2 ? (
      <>
        {props.tooltip && <span className="tooltiptext">{props.tooltip}</span>}
        <i className="fa fa-pause-circle"></i>
      </>
    ) : (
      <>
        {props.tooltip && <span className="tooltiptext">{props.tooltip}</span>}
        <i className="fa fa-play-circle"></i>
      </>
    ),
}))`
  color: ${(props) =>
    props.play === 1 ? "#0acf97" : props.play === 2 ? "#f1d827" : "#0acf97"};
  font-size: 1.2rem;
  display: inline-block;
  padding: 0 3px;
  max-height: 30px;
  border: none;
  background: transparent;
  cursor: pointer;
  margin-left: 7px;
`;

export const ToggleHiddenButton = styled.button.attrs((props) => ({
  className: props.tooltip ? "tooltip" : "",
  children: props.status ? (
    <>
      {props.tooltip && <span className="tooltiptext">{props.tooltip}</span>}
      <i className="fas fa-eye"></i>
    </>
  ) : (
    <>
      {props.tooltip && <span className="tooltiptext">{props.tooltip}</span>}
      <i className="fas fa-eye-slash"></i>
    </>
  ),
}))`
  color: ${(props) => (props.status ? "#0acf97" : "#de524c")};
  font-size: 1rem;
  display: inline-block;
  padding: 0 3px;
  max-height: 30px;
  border: none;
  background: transparent;
  cursor: pointer;
  margin-left: 7px;
`;

export const TogglePauseChatButton = styled.button.attrs((props) => ({
  className: props.tooltip ? "tooltip" : "",
  children: props.status ? (
    <>
      {props.tooltip && <span className="tooltiptext">{props.tooltip}</span>}
      <i className="fas fa-comment-slash"></i>
    </>
  ) : (
    <>
      {props.tooltip && <span className="tooltiptext">{props.tooltip}</span>}
      <i className="fas fa-comment"></i>
    </>
  ),
}))`
  color: ${(props) => (props.status ? "#de524c" : "#0acf97")};
  font-size: 1rem;
  display: inline-block;
  padding: 0 3px;
  max-height: 30px;
  border: none;
  background: transparent;
  cursor: pointer;
  margin-left: 7px;
`;
export const ToggleNetworking = styled.button.attrs((props) => ({
  className: props.tooltip ? "tooltip" : "",
  children: props.status ? (
    <>
      {props.tooltip && <span className="tooltiptext">{props.tooltip}</span>}
      <i className="fas fa-users"></i>
    </>
  ) : (
    <>
      {props.tooltip && <span className="tooltiptext">{props.tooltip}</span>}
      <i className="fas fa-users-slash"></i>
    </>
  ),
}))`
  color: ${(props) => (props.status ? "#0acf97" : "#de524c")};
  font-size: 1rem;
  display: inline-block;
  padding: 0 3px;
  max-height: 30px;
  border: none;
  background: transparent;
  cursor: pointer;
  margin-left: 7px;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
  > label {
    display: inline-block;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  > input {
    display: block;
    width: 100%;
    height: calc(2.2125rem + 2px);
    padding: 0.45rem 0.9rem;
    font-size: 0.875rem;
    line-height: 1.5;
    color: #6c757d;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    :focus {
      color: #495057;
      background-color: #fff;
      border-color: #c1c9d0;
      outline: 0;
    }
    :disabled,
    :read-only {
      background-color: #e9ecef;
      opacity: 1;
    }
    &.is-valid,
    :valid {
      border-color: #28a745;
    }
    :placeholder-shown {
      border-color: #dee2e6;
    }
  }
  > textarea {
    display: block;
    width: 100%;
    padding: 0.45rem 0.9rem;
    font-size: 0.875rem;
    line-height: 1.5;
    color: #6c757d;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    :focus {
      color: #495057;
      background-color: #fff;
      border-color: #c1c9d0;
      outline: 0;
    }
    :disabled,
    :read-only {
      background-color: #e9ecef;
      opacity: 1;
    }
    &.is-valid,
    :valid {
      border-color: #28a745;
    }
    :placeholder-shown {
      border-color: #dee2e6;
    }
  }
  > select {
    display: block;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
  span.radios {
    input {
      margin: 0;
    }
    label {
      margin: 0 10px;
    }
  }
`;
export const XButton = styled.button.attrs({
  type: "button",
})`
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
  background: transparent;
  transition: background-color 0.1s ease;
  :hover {
    background: #bdbbbb;
  }
`;

export const CustomLink = styled(Link)`
  display: inline-block;
`;

export const ToggleContainer = styled.label`
  position: relative;
  display: block !important;
  width: 45px;
  height: 25px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .switch {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 50%;
    }
  }
  input:checked + .switch {
    background-color: teal;
  }

  input:focus + .switch {
    box-shadow: 0 0 1px teal;
  }

  input:checked + .switch:before {
    -webkit-transform: translateX(18px);
    -ms-transform: translateX(18px);
    transform: translateX(18px);
  }
`;
