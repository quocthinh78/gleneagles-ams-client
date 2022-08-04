import { useEffect } from "react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CPPaginationBar from "../../../components/CPAdminMainContent/CPPaginationBar";
import { Tooltip } from "../../../hooks/useTooltip";
import apiInstance from "../../../services";
import * as s from "../../../styles/AdminPage.styles";
import { toast } from "react-toastify";
import socket from "../../../services/socket";
import moment from "moment";
import ImportUserPage from "./ImportUserPage";
import { ADMIN_CREATE_EVENTS_PAGE } from "../../../routes/constant";
import CPTableEntries from "../../../components/CPAdminMainContent/CPTableEntries";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [showimport, setShowimport] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [amountData, setAmountData] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isnetworking, setIsnetworking] = useState(false);

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, [pageIndex, pageSize]);

  const handlePageChange = (page) => {
    setPageIndex(page);
  };

  const handleNetworking = async (id) => {
    try {
      const { data } = await apiInstance({
        url: `event/toggle-event-networking/${id}`,
        method: "GET",
      });

      setIsnetworking(data.is_networking);
      if (data.is_networking === true) {
        toast.success("Enabled Networking");
      }
      if (data.is_networking === false) {
        toast.success("Disabled Networking");
      }
      const changes = events.map((e) =>
        e.id === id ? { ...e, is_networking: !e.is_networking } : e
      );
      setEvents(changes);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleActiveEvent = (id, state) => {
    socket.emit("toggle-event", { event_id: id, state: !state });
    const changes = events.map((e) =>
      e.id === id ? { ...e, state: !e.state } : e
    );
    setEvents(changes);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this event?")) {
      try {
        const { data } = await apiInstance({
          url: `event/delete-event/${id}`,
          method: "DELETE",
        });

        toast.success("Delete Success");
        setEvents(events.filter((e) => e.id !== id));
        setAmountData(amountData - 1);
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const getEvents = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data } = await apiInstance({
        url: "event/get-events",
        method: "GET",
        params: {
          page: pageIndex,
          size: pageSize,
        },
      });
      setEvents(data.events);
      setAmountData(data.counts);
      setPageNumber(data.maxPasge);
    } catch (err) {
      toast.error(err.message);
    }
    setIsLoading(false);
  };

  const filtermessage = (value) => {
    if (value < 4) return [value, 0];
    if (3 < value < 7) return [0, value - 3];
    if (value === 0) return [0, 0];
  };

  const selectMessageOption = async (messageoption, id) => {
    const message_option = filtermessage(Number(messageoption));
    console.log(message_option);
    try {
      const { data } = await apiInstance({
        url: "event/change-pin-pause-message",
        method: "POST",
        data: {
          pauseOption: message_option[0],
          pinOption: message_option[1],
          eventId: id,
        },
      });

      toast.success("Change Pause Option Success");
      const changes = events.map((e) =>
        e.id === id
          ? {
              ...e,
              selected_pause_message: message_option[0],
              // selected_pin_message:
              //   message_option[1] > 0
              //     ? message_option[1] + 3
              //     : message_option[1],
              selected_pin_message: message_option[1],
            }
          : e
      );
      setEvents(changes);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleImportUser = async (eventId) => {
    if (window.confirm("Are you sure to import all users to this event?")) {
      try {
        await apiInstance({
          url: "event/add-all-to-event",
          method: "POST",
          data: {
            eventId,
          },
        });
        toast.success("Import successfully");
      } catch (error) {
        console.log(error);
        toast.error("Something wrong when import users");
      }
    }
  };
  // const handleImportUserExcel = () => {
  //   setShowimport(events.id);
  // };

  const convertDateTime = (time) => {
    // let newTime = moment(time);
    // var dateComponent = newTime
    //   .utc()
    //   .utcOffset("+08:00")
    //   .format("DD-MM-YYYY h:mm:ss A");

    // let tz = "Asia/Singapore";
    // let fixTZ = dateComponent.clone().tz(tz).format("DD-MM-YYYY h:mm:ss A");
    // return dateComponent;
    return moment(time).format("DD-MM-YYYY h:mm:ss A");
  };

  const handlemessageoption = (pauseoption, pinoption) => {
    if (pinoption === 0 && pauseoption > 0) return pauseoption;
    // if (pauseoption === 0 && pinoption === 0) return pinoption;
    if (pauseoption === 0 && pinoption === 1) return 4;
    if (pauseoption === 0 && pinoption === 2) return 5;
    if (pauseoption === 0 && pinoption === 3) return 6;
    else return 0;
  };

  return (
    <Fragment>
      <s.TitleBox>
        <div>
          <CustomLink to={ADMIN_CREATE_EVENTS_PAGE}>
            <s.Button>New Event</s.Button>
          </CustomLink>
        </div>
        <div className="right">Events</div>
      </s.TitleBox>

      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4>All events</s.H4>
            <s.RefreshBtn onClick={() => getEvents()}>
              <i className="fas fa-redo"></i>
              Refresh
            </s.RefreshBtn>
          </s.Col_6>
        </s.Flex>
        <s.Param>List all latest events.</s.Param>
        <s.DataTable>
          <s.TableLength>
            <label>
              Show&nbsp;
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              &nbsp;entries
            </label>
            {/* <s.SearchBox>
              Search:&nbsp;
              <input
                type="text"
                value={searchKey}
                placeholder="Type something"
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </s.SearchBox> */}
          </s.TableLength>
          <s.TableWrapper>
            <s.Table cellSpacing={0} fullwidth>
              <s.DataTable_head>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  {/* <th>Content</th> */}
                  <th>Logged in/ Total</th>
                  <th>Start at</th>
                  <th>Video Type</th>
                  <th>Message</th>
                  <th>Networking</th>
                  <th>Action</th>
                  <th>Import User</th>
                  <th>Import user by Excel</th>
                </tr>
              </s.DataTable_head>

              <s.DataTable_body>
                {isLoading ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      Processing...
                    </td>
                  </tr>
                ) : events.length !== 0 ? (
                  events.map((e) => (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>{e.title}</td>
                      {/* <td>{e.content}</td> */}
                      <td style={{ textAlign: "center" }}>
                        {e.onlineCount + "/" + e.count}
                      </td>
                      <td>{convertDateTime(e.start_at)}</td>
                      <td>{e.video_type}</td>
                      {/* <td>{e.state ? "true" : "false"}</td> */}
                      {/* <td style={{ textAlign: "center" }}>
                        <s.TogglePauseChatButton
                          status={e.pause_chat}
                          tooltip={e.pause_chat ? "Paused" : "Actived"}
                          onClick={() => handlePauseChat(e.id, e.pause_chat)}
                        />
                      </td> */}
                      <td>
                        <select
                          value={handlemessageoption(
                            e.selected_pause_message,
                            e.selected_pin_message
                          )}
                          // onChange={(e) => setPageSize(e.target.value)}
                          onChange={(g) =>
                            selectMessageOption(g.target.value, e.id)
                          }
                        >
                          <option value={0}>Turn off</option>
                          <option value={1}>Pause Msg 1</option>
                          <option value={2}>Pause Msg 2</option>
                          <option value={3}>Pause Msg 3</option>
                          <option value={4}>Pinned Msg 1</option>
                          <option value={5}>Pinned Msg 2</option>
                          <option value={6}>Pinned Msg 3</option>
                        </select>
                      </td>
                      {/* <td>
                        <select
                          value={e.selected_pin_message}
                          // onChange={(e) => setPageSize(e.target.value)}
                          onChange={(g) =>
                            selectPinOption(g.target.value, 0, e.id)
                          }
                        >
                          <option value={0}>Turn off</option>
                          <option value={1}>Pinned Msg 1</option>
                          <option value={2}>Pinned Msg 2</option>
                          <option value={3}>Pinned Msg 3</option>
                        </select>
                      </td> */}
                      <td style={{ textAlign: "center" }}>
                        <s.ToggleNetworking
                          status={e.is_networking}
                          tooltip={e.is_networking ? "Enabled" : "Disabled"}
                          onClick={() => handleNetworking(e.id)}
                        />
                      </td>
                      <td>
                        <CustomLink to={`/admin/events/${e.id}/edit`}>
                          <Tooltip tooltip="Edit Event">
                            <s.EditLink>
                              <i className="fas fa-edit"></i>
                            </s.EditLink>
                          </Tooltip>
                        </CustomLink>
                        <Tooltip tooltip="Delete Event">
                          <s.DeleteLink onClick={() => handleDelete(e.id)}>
                            <i className="fas fa-trash"></i>
                          </s.DeleteLink>
                        </Tooltip>
                        <s.ToggleHiddenButton
                          status={e.state}
                          tooltip={e.state ? "Enabled" : "Disabled"}
                          onClick={() => handleActiveEvent(e.id, e.state)}
                        />
                      </td>
                      <td>
                        <s.Button onClick={() => handleImportUser(e.id)}>
                          Import All
                        </s.Button>
                      </td>
                      <td>
                        {showimport === e.id ? (
                          <ImportUserPage eventId={e.id}></ImportUserPage>
                        ) : (
                          <s.Button onClick={() => setShowimport(e.id)}>
                            Import by Excel
                          </s.Button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      There is no event
                    </td>
                  </tr>
                )}
              </s.DataTable_body>
            </s.Table>
          </s.TableWrapper>

          <CPTableEntries
            currentPage={pageIndex}
            pageSize={pageSize}
            totalCount={amountData}
            count={events.length}
          />

          <CPPaginationBar
            totalPage={pageNumber}
            pageIndex={pageIndex}
            onPageChange={handlePageChange}
          />
        </s.DataTable>
      </s.MainTable>
    </Fragment>
  );
}

export default EventsPage;

const CustomLink = styled(Link)`
  display: inline-block;
`;
