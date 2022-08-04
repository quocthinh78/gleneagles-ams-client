import { Fragment, useCallback, useEffect } from "react";
import * as s from "../../../../styles/AdminPage.styles";
import Select from "react-select";
import { useState } from "react";
import apiInstance from "../../../../services";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ADMIN_WORDCLOUD_PAGE } from "../../../../routes/constant";

function EditWordCloudPage() {
  const history = useHistory();
  const params = useParams();
  const events = useSelector((state) => state.adminReducer.listEvents);
  const [content, setContent] = useState("");
  const [event_id, setEventId] = useState(0);

  const getEventDefault = useCallback(() => {
    const eDefault = events
      ? events.filter((e) => parseInt(e.value) == event_id)
      : [];
    return eDefault[0];
    // eslint-disable-next-line
  }, [event_id]);

  const getCloudDetail = async () => {
    try {
      const { data } = await apiInstance({
        url: `inquiry/get-inquiry-detail/${params.id}`,
        method: "GET",
      });
      setContent(data.inquiry.content);
      setEventId(data.inquiry.event_id);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCloudDetail();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (event_id === 0) {
      return alert("Please select an event");
    }
    const bodyData = {
      id: parseInt(params.id),
      content,
      event_id,
      status: 0,
    };
    console.log(bodyData);
    try {
      await apiInstance({
        url: "inquiry/edit",
        method: "PATCH",
        data: bodyData,
      });

      toast.success("Cloud updated");
      setTimeout(() => {
        history.push(ADMIN_WORDCLOUD_PAGE);
      }, 1500);
    } catch (err) {
      toast.error("Updating cloud has been failed");
      console.log(err.message);
    }
  };
  return (
    <Fragment>
      <s.TitleBox>
        <div className="right">Edit Cloud</div>
      </s.TitleBox>
      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4 style={{ marginBottom: 20 }}>EDIT CLOUD</s.H4>
          </s.Col_6>
        </s.Flex>
        <form onSubmit={handleSubmit}>
          <s.FormGroup>
            <label htmlFor="cloud_event">Event</label>
            <Select
              options={events}
              value={getEventDefault()}
              instanceId
              onChange={(e) => {
                setEventId(e.value);
                // setEventDefault({ value: e.value, label: e.label });
              }}
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="cloud_content">Cloud Content</label>
            <input
              id="cloud_content"
              name="content"
              onChange={(e) => setContent(e.currentTarget.value)}
              value={content}
              type="text"
              placeholder="Please enter cloud content"
              required
            />
          </s.FormGroup>
          <s.Button type="submit">Submit</s.Button>
        </form>
      </s.MainTable>
    </Fragment>
  );
}

export default EditWordCloudPage;
