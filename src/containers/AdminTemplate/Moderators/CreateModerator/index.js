import { Fragment, useState } from "react";
import * as s from "../../../../styles/AdminPage.styles";
import Select from "react-select";
import apiInstance from "../../../../services";
import { Redirect, useHistory } from "react-router";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useUser from "../../../../hooks/useUser";
import {
  ADMIN_MODERATORS_PAGE,
  ADMIN_PRESENTERS_PAGE,
} from "../../../../routes/constant";

function CreateModeratorPage() {
  const history = useHistory();
  const events = useSelector((state) => state.adminReducer.listEvents);
  const [eventId, setEventId] = useState(0);
  const user = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (eventId === 0) {
      return alert("Please select an event");
    }
    try {
      await apiInstance({
        url: "moderator/create-moderator",
        method: "POST",
        data: {
          event_id: eventId,
        },
      });

      toast.success("Moderator created");
      setTimeout(() => {
        history.push("/admin/moderators");
      }, 1500);
    } catch (err) {
      toast.error("Creating a moderator has been failed");
      console.log(err);
    }
  };

  // If user is not an admin
  if (user.data.is_presenter) return <Redirect to={ADMIN_PRESENTERS_PAGE} />;
  if (user.data.is_moderator) return <Redirect to={ADMIN_MODERATORS_PAGE} />;

  return (
    <Fragment>
      <s.TitleBox>
        <div className="right">Create Moderator</div>
      </s.TitleBox>
      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4 style={{ marginBottom: 20 }}>CREATE MODERATOR</s.H4>
          </s.Col_6>
        </s.Flex>
        <form onSubmit={handleSubmit}>
          <s.FormGroup>
            <label htmlFor="moderator_event">Event</label>
            <Select
              id="moderator_event"
              options={events}
              instanceId
              onChange={(e) => setEventId(e.value)}
            />
          </s.FormGroup>
          <s.Button type="submit">Submit</s.Button>
        </form>
      </s.MainTable>
    </Fragment>
  );
}

export default CreateModeratorPage;
