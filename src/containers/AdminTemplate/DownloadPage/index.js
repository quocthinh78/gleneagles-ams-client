import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as s from "../../../styles/AdminPage.styles";
import Select from "react-select";
import apiInstance from "../../../services";
function DownloadPage() {
  const events = useSelector((state) => state.adminReducer.listEvents);
  const [searchOption, setSearchOpt] = useState();
  const handleDownloadData = (endpoint, filename) => {
    if (searchOption === undefined) {
      return alert("Please choose the event you want to export");
    }
    try {
      apiInstance({
        url: endpoint + searchOption,
        method: "GET",
        responseType: "arraybuffer",
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${filename}.xlsx`);
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <s.TitleBox>
        <div className="right">Download</div>
      </s.TitleBox>
      <s.MainTable>
        <s.Flex>
          <s.Col_12 className="center">
            <SelectField className="select-event">
              <div style={{ width: "100%" }}>
                <Select
                  onChange={(e) => setSearchOpt(e.value)}
                  options={events}
                />
              </div>
            </SelectField>
          </s.Col_12>
        </s.Flex>
        <s.DataTable>
          <s.Button
            onClick={() => handleDownloadData("user/donwloadUsers/", "Users")}
          >
            Users
          </s.Button>
          <s.Button
            onClick={() =>
              handleDownloadData("resolution/download/", "Resolution")
            }
          >
            Resolution
          </s.Button>
          <s.Button
            onClick={() =>
              handleDownloadData("message/downloadMessages/", "Messages")
            }
          >
            Messages
          </s.Button>
          <s.Button
            onClick={() => handleDownloadData("poll/downloadPolls/", "Polls")}
          >
            Poll
          </s.Button>
          <s.Button
            onClick={() =>
              handleDownloadData("question/downloadQuestions/", "Questions")
            }
          >
            Questions
          </s.Button>
        </s.DataTable>
      </s.MainTable>
    </Fragment>
  );
}

export default DownloadPage;

const SelectField = styled.div`
  height: 28px;
  width: 35%;
  position: relative;
  margin-bottom: 1.5rem;
  select {
    width: 100%;
    height: 100%;
  }
`;
