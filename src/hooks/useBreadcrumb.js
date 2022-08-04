import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

function Breadcrumb({ fontSize = 14, disablePath = "" }) {
  const location = useLocation();
  const arrayPath = location.pathname.split("/").splice(1);



  const breadcrumb = arrayPath.map((addr, index) => {
    let combinePath = "/";
    for (let i = 0; i <= index; i++) {
      combinePath += arrayPath[i] + "/";
    }
    return (
      <Li
        fontSize={fontSize}
        key={addr + Date.now()}
        className={arrayPath[index] === disablePath && "disabled"}
      >
        <EmbeddedLink to={combinePath}>{addr}</EmbeddedLink>
      </Li>
    );
  });

  return (
    <nav>
      <List>{breadcrumb}</List>
    </nav>
  );
}

export default Breadcrumb;

const List = styled.ol`
  display: flex;
  flex-wrap: wrap;
  padding: 0 0;
  margin-bottom: 1rem;
  list-style: none;
`;
const Li = styled.li`
  color: #0d6efd;
  cursor: pointer;
  font-size: ${(props) => props.fontSize}px;
  :hover {
    color: #0a58ca;
  }
  &:not(:first-child)::before {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    color: #6c757d;
    content: "/";
    :hover {
      text-decoration: none;
    }
  }
  &:last-child {
    color: #6c757d;
    cursor: default;
    pointer-events: none;
  }
  &.disabled {
    color: #6c757d;
    cursor: default;
    pointer-events: none;
  }
`;
const EmbeddedLink = styled(Link)`
  text-transform: capitalize;
  :hover {
    text-decoration: underline;
  }
`;
