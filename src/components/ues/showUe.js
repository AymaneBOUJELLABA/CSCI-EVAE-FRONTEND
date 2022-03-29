import "antd/dist/antd.css";

import { Button, Space, Spin, Table, Tag, Tooltip } from "antd";
import {
  CarryOutOutlined,
  FileSearchOutlined,
  ScheduleOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";

import Popup from "../Evaluation/Popup";
import React, { useState } from "react";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

export default function ShowUe() {
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [ue, setUe] = useState({});
  const columns = [
    {
      title: () => <div style={{ fontWeight: "bolder" }}>Code UE</div>,
      dataIndex: "codeUe",

      sortDirections: ["ascend"],
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.codeUe.localeCompare(b.codeUe),
      onCell: (record) => ({ style: { fontWeight: "bold" } }),
    },
    {
      title: () => <div style={{ fontWeight: "bolder" }}>Désignation</div>,
      dataIndex: "designation",
      sortDirections: ["ascend"],

      sorter: (a, b) => a.designation.localeCompare(b.designation),
    },
    {
      title: () => <div style={{ fontWeight: "bolder" }}>Enseignant</div>,
      dataIndex: "nom",
      render: (text, record) =>
        record.prenom
          ? record.prenom.charAt(0).toUpperCase() +
            record.prenom.slice(1).toLowerCase() +
            " " +
            record.nom.toUpperCase()
          : record.prenom + " " + record.nom,
      sortDirections: ["ascend"],
      sorter: (a, b) => a.nom.localeCompare(b.nom),
    },
    {
      title: () => <div style={{ fontWeight: "bolder" }}>Action</div>,
      dataIndex: "actions",
      render: (text, record) => (
        <Space size="large">
          {/*             
             <Button type="primary" shape="round" icon={<ZoomInOutlined />}  onClick={()=> console.log(record)}>
              Details
             </Button>
           */}

          <Tooltip
            placement="topLeft"
            title="Cliquer pour accéder aux détails de cette UE"
          >
            <Button
              type="primary"
              shape="round"
              icon={<FileSearchOutlined />}
              onClick={
                () => navigate(`/UniteEnseignement/${record.codeUe}`)
                // (window.location.href = ``)
              }
            >
              Details
            </Button>
          </Tooltip>

          <Tooltip
            placement="topRight"
            title="Cliquer pour accéder à l'évaluation de cette UE"
          >
            <Button
              type="light"
              shape="round"
              icon={<ScheduleOutlined />}
              onClick={() => navigate(`/Evaluation/popup/${record.codeUe}`)}
            >
              Evaluation
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];
  const [data, setData] = useState([]);
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const [loading, setLoading] = useState(true);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  React.useEffect(() => {
    fetch("http://localhost:8082/api/ue/list/M2DOSI", options)
      .then((response) => response.json())
      .then((response) => {
        console.log("data response ", response);
        setData(response);
        //this.setState({ data: response });
        console.log("list ue data : ", data);
        setLoading(false);
        //this.setState({ loading: false });
      })
      .catch((err) => console.error(err));
  }, []);
  /*
  componentDidMount = () => {
    fetch("http://localhost:8082/api/ue/list/M2DOSI", options)
      .then((response) => response.json())
      .then((response) => {
        console.log("data response ", response);
        setData(response);
        //this.setState({ data: response });
        console.log("list ue data : ", data);
        setLoading(false);
        //this.setState({ loading: false });
      })
      .catch((err) => console.error(err));

    //fetchdata();
  };
*/

  return (
    <div style={{ paddingTop: "30px" }}>
      <Tag
        color="#cd201f"
        style={{
          fontSize: "17px",
          fontWeight: "bolder",
          marginBottom: "10px",
          padding: "5px",
        }}
      >
        M2 DOSI 2014 - 2015
      </Tag>

      <Title
        level={5}
        style={{ paddingBottom: "10px", fontFamily: "Garamond" }}
      >
        <Space>
          <CarryOutOutlined />
          Unités d'enseignement
        </Space>
      </Title>
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <br />
          <Spin tip="Chargement..." size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          pagination={false}
          style={{ fontFamily: "Garamond", marginBottom: "50px" }}
        />
      )}

      {ue.codeUe && (
        <Popup
          ue={ue}
          openPopup={openPopup}
          setOpenPopup={(bool) => setOpenPopup(bool)}
        />
      )}
    </div>
  );
}
