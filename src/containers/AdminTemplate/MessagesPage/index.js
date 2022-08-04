import { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Select from "react-select";
import CPPaginationBar from "../../../components/CPAdminMainContent/CPPaginationBar";
import { Tooltip } from "../../../hooks/useTooltip";
import apiInstance from "../../../services";
import * as s from "../../../styles/AdminPage.styles";
import moment from "moment";
import CPTableEntries from "../../../components/CPAdminMainContent/CPTableEntries";
import socket from "../../../services/socket";


function MessagesPage() {
  const events = useSelector((state) => state.adminReducer.listEvents);
  const allEventsOptions = [{ value: 0, label: "All Events" }, ...events];
  const [messages, setMessages] = useState([]);
  const [searchOption, setSearchOpt] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [amountData, setAmountData] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line
  }, [pageIndex, searchOption, pageSize, searchKey]);

  const handlePageChange = (page) => {
    setPageIndex(page);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this message?")) {
      try {
        await apiInstance({
          url: `message/deleteMessage/${id}`,
          method: "DELETE",
        });
        toast.success("Delete Success");
        setMessages(messages.filter((m) => m.id !== id));
        setAmountData(amountData - 1);
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const handleBlock = async (id, status, eventId) => {
    try {
      socket.emit("change-message-status", { message_id: id, status: !status, event_id: eventId });

      const changes = messages.map((m) =>
        m.id === id ? { ...m, status: !m.status } : m
      );
      setMessages(changes);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getMessages = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data } = await apiInstance({
        url: "message/searchMessages",
        method: "GET",
        params: {
          event: searchOption,
          page: pageIndex,
          size: pageSize,
          search: searchKey,
        },

        // data: {
        //   page: pageIndex,
        //   pagesize: pageSize,
        //   event_id: searchOption,
        // },
      });
      setMessages(data.messages);
      setAmountData(data.totalMessage);
      setPageNumber(data.maxPage);
    } catch (err) {
      console.error("searchMessages error:", err);
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      <s.TitleBox>
        <div className="right">Messages</div>
      </s.TitleBox>
      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4>All messages</s.H4>
            <s.RefreshBtn onClick={() => getMessages()}>
              <i className="fas fa-redo"></i>
              Refresh
            </s.RefreshBtn>
          </s.Col_6>
          <s.Col_6 className="right">
            <div style={{ width: "50%" }}>
              <Select
                width="300px"
                defaultValue={allEventsOptions[0]}
                onChange={(e) => setSearchOpt(e.value)}
                options={allEventsOptions}
              />
            </div>
          </s.Col_6>
        </s.Flex>
        <s.Param>List all latest messages.</s.Param>
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
            <s.SearchBox>
              Search:&nbsp;
              <input
                type="text"
                value={searchKey}
                placeholder="Type something"
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </s.SearchBox>
          </s.TableLength>
          <s.TableWrapper>
            <s.Table cellSpacing={0} fullwidth>
              <s.DataTable_head>
                <tr>
                  <th>User name</th>
                  <th>Content</th>
                  {/* <th>Event</th> */}
                  {/* <th>Group</th> */}
                  <th>Create At</th>
                  <th>Actions</th>
                </tr>
              </s.DataTable_head>
              <s.DataTable_body>
                {isLoading ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      Processing...
                    </td>
                  </tr>
                ) : messages.length !== 0 ? (
                  messages.map((m) => (
                    <tr key={m.id}>
                      <td>{m.user_name ? m.user_name : m.email}</td>
                      <td>{m.content}</td>
                      {/* <td>{m.event_title}</td> */}
                      {/* <td>{m.group_name}</td> */}
                      <td>
                        {moment(m.created_at).format("DD-MM-YYYY h:mm:ss A")}
                      </td>
                      <td>
                        <Tooltip tooltip="Delete Message">
                          <s.DeleteLink onClick={() => handleDelete(m.id)}>
                            <i className="fas fa-trash"></i>
                          </s.DeleteLink>
                        </Tooltip>
                        <s.ToggleHiddenButton
                          status={m.status}
                          tooltip={m.status ? "Actived" : "Hided"}
                          onClick={() => handleBlock(m.id, m.status, m.event_id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      There is no message
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
            count={messages.length}
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

export default MessagesPage;
