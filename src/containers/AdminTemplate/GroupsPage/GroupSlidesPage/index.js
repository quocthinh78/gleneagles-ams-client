import { Button, message, Modal, Upload } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import {
  DeleteOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { filter } from "lodash";
import apiInstance from "../../../../services";
import * as s from "../../../../styles/AdminPage.styles";
import { useParams } from "react-router-dom";

function getBase64(file) {
  console.log("getBase64", file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const GroupSlidesPage = () => {
  const params = useParams();
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchGroupData();
  }, []);

  const fetchGroupData = async () => {
    try {
      const res = await apiInstance.get(`group/get-group-slides/${params.id}`);
      // console.log(res.data);
      setFileList(
        res.data.slides.map((i) => ({
          name: i.file_key,
          status: "done",
          url: i.url,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const uploadedListProps = {
    listType: "picture-card",
    fileList: fileList,
    onPreview: async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewVisible(true);
    },
  };

  return (
    <Fragment>
      <s.TitleBox>
        <div className="right">Group Slides</div>
      </s.TitleBox>
      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4 style={{ marginBottom: 20 }}>GROUP SLIDES</s.H4>
          </s.Col_6>
        </s.Flex>
        <div>
          <s.FormGroup>
            <label>Current slides</label>
            <Upload
              {...uploadedListProps}
              showUploadList={{ showRemoveIcon: false }}
            />
          </s.FormGroup>
          <s.FormGroup>
            <label>Upload new slides</label>
            <UploadNewFileList
              setPreviewImage={setPreviewImage}
              setPreviewVisible={setPreviewVisible}
              fetchGroupData={fetchGroupData}
            />
          </s.FormGroup>
        </div>
        <Modal
          visible={previewVisible}
          bodyStyle={{ padding: 0, height: "100%", width: "100%" }}
          title={null}
          footer={null}
          onCancel={() => setPreviewVisible(false)}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </s.MainTable>
    </Fragment>
  );
};

const UploadNewFileList = ({
  setPreviewVisible,
  setPreviewImage,
  fetchGroupData,
}) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [imageList, setImageList] = useState([]);

  const props = {
    name: "file",
    multiple: true,
    fileList: imageList,
    customRequest: async ({ file, onSuccess }) => {
      console.log(file);
      setImageList([...imageList, file]);
      onSuccess({ message: "uploaded" }, file);
    },
    onChange(info) {
      const { status } = info.file;
      console.log(info);
      if (status === "uploading") {
        console.log(info.file, info.fileList);
        setLoading(true);
      }
      if (status === "done") {
        setLoading(false);
        // message.success(`${info.file.name} photo uploaded successfully.`);
      } else if (status === "error") {
        setLoading(false);
        message.error(`${info.file.name} photo upload failed.`);
      }
    },
    onRemove: (file) => {
      const newList = filter(imageList, (o) => {
        return o.uid !== file.uid;
      });
      setImageList(newList);
      message.success(`${file.name} photo removed successfully.`);
    },
    onPreview: async (originFileObj) => {
      if (!originFileObj.preview) {
        originFileObj.preview = await getBase64(originFileObj);
      }
      setPreviewImage(originFileObj.preview);
      setPreviewVisible(true);
    },
    beforeUnload: (file) => {
      const isValidFileType =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif" ||
        file.type === "image/webp" ||
        file.type === "image/svg+xml";

      if (!isValidFileType) {
        message.error("You can only upload JPG/PNG/GIF/WEBP/SVG file!");
      }
      return isValidFileType;
    },
  };

  const handleCancel = () => {
    setImageList([]);
  };

  const handleUpdate = async () => {
    console.log(imageList);
    try {
      const fmt = new FormData();
      // fmt.append("images", imageList[0]);
      imageList.forEach((f) => {
        fmt.append("images", f);
      });
      // for (let i = 0; i < imageList.length; i++) {
      //   fmt.append("images", imageList[i]);
      // }

      console.log(fmt.getAll("images"));
      const res = await apiInstance.post(`group/add-group-slides/${id}`, fmt, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("handleUpdate: ", res);
      setImageList([]);
      fetchGroupData();
    } catch (error) {
      console.log("handle update: ", error);
      message.error(`Something went wrong. Please try again later.`);
    }
  };

  return (
    <div style={{ cursor: loading ? "progress" : "auto" }}>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
      {imageList.length > 0 && (
        <div style={{ marginTop: 20, gap: 10, display: "flex" }}>
          <Button icon={<SaveOutlined />} onClick={handleUpdate}>
            Update slides
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default GroupSlidesPage;
