import { Fragment, useEffect, useState } from "react";
import { useForm } from "../../../../hooks/useForm";
import * as s from "../../../../styles/AdminPage.styles";
import Select from "react-select";
import apiInstance from "../../../../services";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { ADMIN_RESOLUTION_PAGE } from "../../../../routes/constant";
import { find } from "lodash";

const methodOption = [
  { value: 0, label: "Share" },
  { value: 1, label: "Hands" },
];

const EditResolutionPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [
    { content, number, method, majority, event_id },
    setForm,
    ,
    setAllForm,
  ] = useForm({
    content: "",
    number: "",
    method: -1,
    majority: 0,
    event_id: 0,
  });

  useEffect(() => {
    getResolutionDetail();
    // eslint-disable-next-line
  }, []);

  const getResolutionDetail = async () => {
    setLoading(true);
    try {
      const { data } = await apiInstance({
        url: `resolution/${id}`,
        method: "GET",
      });
      const { reso } = data;

      setSelectedOption({
        ...find(methodOption, { value: reso.method }),
      });
      setAllForm({
        method: reso.method,
        number: reso.number,
        content: reso.content,
        majority: reso.majority,
        event_id: reso.event_id,
      });
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (method === -1) {
      return alert("Please select a method");
    }
    if (!number) {
      return alert("Please enter order number for this resolution");
    }

    setLoading(true);

    const bodyData = {
      content,
      number,
      method,
      majority,
      event_id,
      resolution_id: Number(id),
    };

    try {
      await apiInstance({
        url: "resolution",
        method: "PATCH",
        data: bodyData,
      });

      toast.success("Resolution has been updated");
      setLoading(false);
      setTimeout(() => {
        history.push(ADMIN_RESOLUTION_PAGE);
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error("Updating resolution has been failed");
      setLoading(false);
    }
  };

  const handleChangeMethod = (option) => {
    setSelectedOption(option);
    setForm({
      target: { value: option.value, name: "method" },
    });
  };

  return (
    <Fragment>
      <s.TitleBox>
        <div className="right">Edit Resolution</div>
      </s.TitleBox>
      <s.MainTable isLoading={loading}>
        <s.Flex>
          <s.Col_6>
            <s.H4 style={{ marginBottom: 20 }}>EDIT RESOLUTION</s.H4>
          </s.Col_6>
        </s.Flex>
        <form onSubmit={handleSubmit}>
          <s.FormGroup>
            <label>Method</label>
            <Select
              options={methodOption}
              onChange={handleChangeMethod}
              value={selectedOption}
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

          <br />
          <s.Button type="submit">Submit</s.Button>
        </form>
      </s.MainTable>
    </Fragment>
  );
};

export default EditResolutionPage;
