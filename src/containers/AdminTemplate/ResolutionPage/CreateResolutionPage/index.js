import { Fragment, useState } from "react";
import { useForm } from "../../../../hooks/useForm";
import * as s from "../../../../styles/AdminPage.styles";
import Select from "react-select";
import apiInstance from "../../../../services";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ADMIN_RESOLUTION_PAGE } from "../../../../routes/constant";
import socket from "../../../../services/socket";

function CreateResolutionPage() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const events = useSelector((state) => state.adminReducer.listEvents);
  const [{ content, event_id, number, method, majority }, setForm] = useForm({
    content: "",
    event_id: 0,
    number: "",
    method: -1,
    majority: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (event_id === 0) {
      return alert("Please select an event");
    }
    if (method === -1) {
      return alert("Please select a method");
    }
    if (majority === 0) {
      return alert("Please enter majority for this resolution");
    }
    if (!number) {
      return alert("Please enter order number for this resolution");
    }

    setLoading(true);

    const bodyData = {
      content,
      event_id,
      number,
      method,
      majority: parseInt(majority),
    };
    console.log(bodyData);
    try {
      const { data } = await apiInstance({
        url: "resolution",
        method: "POST",
        data: bodyData,
      });

      toast.success("Resolution created");
      socket.emit("new-reso", {
        reso_id: data.newRes.id,
        event_id: event_id,
      });

      setLoading(false);
      setTimeout(() => {
        history.push(ADMIN_RESOLUTION_PAGE);
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error("Creating a resolution has been failed");
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <s.TitleBox>
        <div className="right">New Resolution</div>
      </s.TitleBox>
      <s.MainTable isLoading={loading}>
        <s.Flex>
          <s.Col_6>
            <s.H4 style={{ marginBottom: 20 }}>CREATE RESOLUTION</s.H4>
          </s.Col_6>
        </s.Flex>
        <form onSubmit={handleSubmit}>
          <s.FormGroup>
            <label>Event</label>
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
            <label>Method</label>
            <Select
              options={[
                { value: 0, label: "Share" },
                { value: 1, label: "Hands" },
              ]}
              onChange={(e) =>
                setForm({
                  target: { value: e.value, name: "method" },
                })
              }
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="resolution_topic">Resolution Text</label>
            <input
              id="resolution_topic"
              name="content"
              onChange={setForm}
              value={content}
              type="text"
              placeholder="Type something ..."
              required
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="resolution_majority">Majority (%)</label>
            <input
              id="resolution_majority"
              name="majority"
              onChange={setForm}
              value={majority}
              type="number"
              min="50"
              max="100"
              placeholder="Enter majority for this resolution"
              required
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="resolution_number">Resolution Number</label>
            <input
              id="resolution_number"
              name="number"
              onChange={setForm}
              value={number}
              type="text"
              placeholder="Enter the order for this resolution"
              required
            />
          </s.FormGroup>
          <br />
          <s.Button type="submit">Submit</s.Button>
        </form>
      </s.MainTable>
    </Fragment>
  );
}

export default CreateResolutionPage;
