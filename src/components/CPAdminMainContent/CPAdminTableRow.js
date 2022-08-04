import { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Tooltip } from "../../hooks/useTooltip";
import { EditLink, LockLink, DeleteLink } from "../../styles/AdminPage.styles";

function CPAdminTableRow({
  userId,
  username,
  email,
  firstName,
  lastName,
  role,
  mobile,
  organization,
  isAttended,
  isLoggedIn,
  isActive,
  handleBlock,
  handleDelete,
}) {
  return (
    <tr>
      {/* <td>{username}</td> */}
      <td>{email}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{mobile}</td>
      <td>{organization}</td>
      {/* <td>{role}</td> */}
      <td>{isLoggedIn ? "true" : "false"}</td>
      <td>{isAttended ? "true" : "false"}</td>
      {/* <td>{isActive ? "true" : "false"}</td> */}
      <td>
        <Link to={`/admin/users/${userId}/detail`}>View detail</Link>
      </td>
      <td>
        <CustomLink to={`/admin/users/${userId}/edit`}>
          <Tooltip tooltip="Edit">
            <EditLink>
              <i className="fas fa-edit"></i>
            </EditLink>
          </Tooltip>
        </CustomLink>
        <Tooltip tooltip="Delete">
          <DeleteLink onClick={() => handleDelete(userId)}>
            <i className="fas fa-trash"></i>
          </DeleteLink>
        </Tooltip>
        <LockLink
          locked={!isActive}
          tooltip={isActive ? "Opened" : "Locked"}
          onClick={() => handleBlock(userId)}
        />
      </td>
    </tr>
  );
}

export default memo(CPAdminTableRow);

const CustomLink = styled(Link)`
  display: inline-block;
`;
