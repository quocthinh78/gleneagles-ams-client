import { Suspense } from "react";
import styled from "styled-components";
import CPAdminSideBar from "../../components/CPAdminSideBar";
import CPAdminMainContent from "../../components/CPAdminMainContent";
import { ToastContainer } from "react-toastify";
import useUser from "../../hooks/useUser";
import { useSelector } from "react-redux";

export default function AdminLayout({ children }) {
  const user = useUser();
  const loadingUsers = useSelector((state) => state.adminReducer.loadingUsers);
  const loadingEvents = useSelector(
    (state) => state.adminReducer.loadingEvents
  );

  // ---------------------------- Fetching data ---------------------------------
  if (loadingEvents || loadingUsers)
    return <Processing>Processing...</Processing>;

  return (
    <PageWrapper>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {user.data.admin && <CPAdminSideBar />}
      <CPAdminMainContent>
        <Suspense fallback={<div>Processing...</div>}>{children}</Suspense>
      </CPAdminMainContent>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  height: 100vh;
  flex-wrap: nowrap;
`;
const Processing = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
