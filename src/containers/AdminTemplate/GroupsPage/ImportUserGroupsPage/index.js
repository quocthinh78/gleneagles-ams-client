import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import XLSX from "xlsx";
import DownloadSample from "../../../../assets/files/sample_csv_users.csv";
import { make_cols, SheetJSFT } from "../../../../helpers/filesUpload";
import apiInstance from "../../../../services";
import * as s from "../../../../styles/AdminPage.styles";
// import { useForm } from "../../../../hooks/useForm";
// import { useHistory } from "react-router";

const ImportUserPage = (groupId) => {
  const [fileState, setFileState] = useState();
  const [dataState, setDataState] = useState();
  const [colsState, setColsState] = useState();
  // const [{ eventIds }, setForm] = useForm({
  //   eventIds: [1],
  // });

  //   console.log(JSON.stringify(dataState, null, 2));

  useEffect(() => {
    if (fileState) handleFile();
    // eslint-disable-next-line
  }, [fileState]);

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) setFileState(files[0]);
  };

  const handleFile = () => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true,
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      // console.log(data);
      const results = getFields(data, "Email");
      setDataState(results);
      setColsState(() => make_cols(ws["!ref"]));
    };

    if (rABS) {
      reader.readAsBinaryString(fileState);
    } else {
      reader.readAsArrayBuffer(fileState);
    }
  };

  const getFields = (input, field) => {
    var output = [];
    for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
    return output;
  };

  const handleImportUser = async () => {
    try {
      await apiInstance({
        url: `group/add-to-group-by-email`,
        method: "POST",
        data: {
          group_id: groupId.groupId,
          user_emails: dataState,
        },
      });

      toast.info("Users have been imported", {
        position: "top-center",
        autoClose: 4000,
      });
    } catch (err) {
      toast.error("Invalid user's email");
    }
  };

  return (
    <Fragment>
      {/* <s.TitleBox>
        <div className="right">Import Users</div>
      </s.TitleBox> */}
      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4 style={{ marginBottom: 20 }}>IMPORT USER DATA</s.H4>
          </s.Col_6>
        </s.Flex>
        <DownloadLink to={DownloadSample} target="_blank" download>
          Download sample
        </DownloadLink>
        <s.FormGroup>
          {" "}
          <input
            type="file"
            name="file"
            accept={SheetJSFT}
            onChange={handleChange}
          />
        </s.FormGroup>

        <s.Button type="button" onClick={() => handleImportUser()}>
          Submit
        </s.Button>
      </s.MainTable>
    </Fragment>
  );
};

export default ImportUserPage;

const DownloadLink = styled(Link)`
  color: #0d6efd;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;
