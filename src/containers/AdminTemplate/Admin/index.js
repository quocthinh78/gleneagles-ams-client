import { Redirect } from "react-router";
import { ADMIN_USERS_PAGE } from "../../../routes/constant";

function Administrative() {
  const condition = true;

  if (condition) return <Redirect to={ADMIN_USERS_PAGE} />;

  return <div>Administrative</div>;
}

export default Administrative;
