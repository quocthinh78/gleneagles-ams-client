import { Fragment } from "react";
import { useForm } from "../../../../hooks/useForm";
import * as s from "../../../../styles/AdminPage.styles";
import Select from "react-select";
import { useState } from "react";
import apiInstance from "../../../../services";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import socket from "../../../../services/socket";
import { ADMIN_WORDCLOUD_PAGE } from "../../../../routes/constant";

function CreateWordCloudPage() {
  const history = useHistory();
  const events = useSelector((state) => state.adminReducer.listEvents);
  const [{ content, event_id }, setForm] = useForm({
    content: "",
    event_id: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (event_id === 0) {
      return alert("Please select an event");
    }
    setLoading(true);
    const bodyData = {
      event_id,
      content,
      status: 0,
    };
    try {
      const { data } = await apiInstance({
        url: "inquiry/create",
        method: "POST",
        data: bodyData,
      });
      console.log(data);
      toast.success("Cloud created");
      socket.emit("new-inquiry", {
        event_id: data.event_id,
        inquiry_id: data.id,
      });
      setLoading(false);
      setTimeout(() => {
        history.push(ADMIN_WORDCLOUD_PAGE);
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error("Creating cloud has been failed");
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <s.TitleBox>
        <div className="right">New Cloud</div>
      </s.TitleBox>
      <s.MainTable isLoading={loading}>
        <s.Flex>
          <s.Col_6>
            <s.H4 style={{ marginBottom: 20 }}>CREATE CLOUD</s.H4>
          </s.Col_6>
        </s.Flex>
        <form onSubmit={handleSubmit}>
          <s.FormGroup>
            <label htmlFor="poll_event">Event</label>
            <Select
              options={events}
              instanceId
              onChange={(e) =>
                setForm({
                  target: { value: e.value, name: "event_id" },
                })
              }
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="cloud_content">Cloud Content</label>
            <input
              id="cloud_content"
              name="content"
              onChange={setForm}
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

export default CreateWordCloudPage;
