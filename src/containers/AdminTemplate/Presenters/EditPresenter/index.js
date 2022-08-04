import { Fragment, useCallback, useState } from "react";
import * as s from "../../../../styles/AdminPage.styles";
import Select from "react-select";
import apiInstance from "../../../../services";
import { useHistory, useParams, useLocation, Redirect } from "react-router";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useUser from "../../../../hooks/useUser";
import {
  ADMIN_MODERATORS_PAGE,
  ADMIN_PRESENTERS_PAGE,
} from "../../../../routes/constant";

function EditPresenterPage() {
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const events = useSelector((state) => state.adminReducer.listEvents);
  const [eventId, setEventId] = useState(urlParams.get("event"));
  const user = useUser();

  const getEventDefault = useCallback(() => {
    const defaultEvent = events?.filter((e) => e.value === parseInt(eventId));
    return defaultEvent;
    // eslint-disable-next-line
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiInstance({
        url: "presenter/edit-presenter",
        method: "PATCH",
        data: {
          presenter_id: parseInt(params.id),
          event_id: parseInt(eventId),
        },
      });

      toast.success("Presenter updated");
      setTimeout(() => {
        history.push("/admin/presenters");
      }, 1500);
    } catch (err) {
      toast.error("Updating presenter has been failed");
      console.log(err);
    }
  };

  // useEffect(() => {
  // getModeratorDetail();
  // eslint-disable-next-line
  // }, []);

  // If user is not an admin
  if (user.data.is_presenter) return <Redirect to={ADMIN_PRESENTERS_PAGE} />;
  if (user.data.is_moderator) return <Redirect to={ADMIN_MODERATORS_PAGE} />;

  return (
    <Fragment>
      <s.TitleBox>
        <div className="right">Edit Presenter</div>
      </s.TitleBox>
      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4 style={{ marginBottom: 20 }}>EDIT PRESENTER</s.H4>
          </s.Col_6>
        </s.Flex>
        <form onSubmit={handleSubmit}>
          <s.FormGroup>
            <label htmlFor="presenter_event">Event</label>
            <Select
              id="presenter_event"
              value={getEventDefault()}
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

export default EditPresenterPage;
