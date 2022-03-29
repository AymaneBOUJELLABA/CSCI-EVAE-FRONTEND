import {
  Button,
  Card,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  PageHeader,
  Row,
  Select,
  Tag,
} from "antd";
import {
  BulbFilled,
  CheckOutlined,
  EditOutlined,
  FileAddOutlined,
  FileSearchOutlined,
  MinusCircleTwoTone,
  PlusCircleOutlined,
  PlusCircleTwoTone,
  PlusSquareOutlined,
} from "@ant-design/icons";

import "moment/locale/fr";
import locale from "antd/lib/locale/fr_FR";
import React from "react";
import "antd/dist/antd.css";

import { ALERT_TYPES, RUBRIQUES_WARNING_MESSAGES } from "../../shared/constant";
import { List, Space, Spin, Tooltip, message } from "antd";
import { MenuOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";

import ReactDragListView from "react-drag-listview";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const key = "updatable";
const onShowAlert = (msg, type) => message[type](msg);
export default function AddEvaluation({
  initialValues,
  onFinish,
  onFinishFailed,
  handleChange,
  handleDelete,
  rubriquesTitle,
  addNewRubrique,
  rubriques,
  selectedValue,
  evaluation,
}) {
  const rangeConfig = {
    rules: [
      {
        type: "array",
        required: true,
        message: "Please select time!",
      },
    ],
  };
  const navigate = useNavigate();
  const [dataB, setDataB] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [dataF, setDataF] = React.useState([]);
  const style = data.length == 0 ? "none" : "block";
  const [rubriquesBis, setRubriquesBis] = React.useState([]);
  const [rub, setRub] = React.useState([]);
  const [selected, setSelected] = React.useState("");
  const [options, setOptions] = React.useState({
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const handleDragStart = (item) => {
    // this.setState({color:"blue"});
    console.log("start");
    console.log(item);
  };

  const handleDragEnd = () => {
    // this.setState({color:"red"});
    console.log("end");
    console.log(data);
  };

  React.useEffect(() => {
    //this.setState({:this.props.evaluation})
    loadData1();
    //this.loadData2();
  }, []);

  const loadData1 = () => {
    let designations = rubriques.map((elt) => elt.designation);
    setDataB(rubriques);
    setData(designations);
    data && loadData2();
    /*fetch('/api/evaluations/ue?codeUe='+this.state.codeUe,this.state.options)
          .then(response =>  response.json())  
          .then(response => {
             
              console.log(response);
              let i = 0;
              response.rubriques.map((elt)=>{
                elt.key=i;
                i++;
              });
              
               
          })
          .catch(err => console.error(err));*/
  };

  const loadData2 = () => {
    fetch("/api/evaluations/rubriques", options)
      .then((response) => response.json())
      .then((response) => {
        let designations = response.map((elt) => elt.designation);
        // console.log("this.state.data",this.state.data);
        // console.log("this.state.designations",designations);
        // console.log("this.state.rubriquesBis",this.state.rubriquesBis);
        setRubriquesBis(designations.filter((value) => !data.includes(value)));
        setRub(response);
        console.log("RUBRIQUES", rubriques);
        console.log("RUBRIQUES", dataB);
        //console.log("RUBRIQUESBIS", rubriquesBis);
        // console.log('this.state.rubriquesBis', this.state.rubriquesBis)
      })
      .catch((err) => console.error(err));
  };

  const handleDelete2 = (item) => {
    console.log(item);
    var array = [...data]; // make a separate copy of the array
    var index = array.indexOf(item);
    console.log(index);
    if (index !== -1) {
      array.splice(index, 1);
      setData(array);
      //this.setState({ data: array });
    }
    var array = [...rubriquesBis]; // make a separate copy of the array

    array.push(item);
    setRubriquesBis(array);
    //this.setState({ rubriquesBis: array });
  };

  const onDragEnd = (fromIndex, toIndex) => {
    if (toIndex < 0) return; // Ignores if outside designated area

    const items = [...data];
    const item = items.splice(fromIndex, 1)[0];
    items.splice(toIndex, 0, item);
    setData(items);
    //this.setState({ data: items });
  };

  const handleChange1 = (value) => {
    console.log(`selected ${value}`);
    setSelected(value);
    //this.setState({ selected: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (selected != "") {
      console.log(selected);
      var array = [...data]; // make a separate copy of the array
      array.push(selected);
      setData(array);
      // this.setState({ data: array });
      editData(selected);
      setSelected("");
    }
  };

  const editData = (value) => {
    setRubriquesBis(rubriquesBis.filter((e) => e != value));
  };

  const handleFormSubmit = (values) => {
    setDataF([]);

    let i = 1;
    data.map((elt) => {
      let eltF = {};
      eltF.ordre = i;
      eltF.designation = elt;

      dataF.push(eltF);
      i++;
    });
    console.log("this.state.dataF", dataF);
    console.log("this.state.rubriques", rubriques);
    console.log("this.state.dataF", rub);
    rub.map((elt) => {
      dataF.map((eltF) => {
        if (eltF.designation == elt.designation) {
          console.log(eltF);
          console.log(eltF);
          eltF.idRubrique = elt.idRubrique;
          eltF.noEnseignant = elt.noEnseignant;
          eltF.type = elt.type;
          eltF.questions = [];
        }
      });
    });
    // console.log("Final Data",dataF);
    // console.log("this.state.dataF.rubriques",this.state.dataF.rubriques);
    // dataF.rubriques = dataFinal;
    //rubriques = dataFinal;
    console.log("this.state.dataF", dataF);
    console.table(values);
    console.table(dataF);
    values.rubriques = dataF;
    onFinish(values);
  };

  return (
    <div>
      <PageHeader
        onBack={() => navigate(-1)}
        title={
          <span>
            <FileAddOutlined style={{ fontSize: "17px" }} /> Ajouter une
            évaluation à l'unité d'enseignement {initialValues.designation} (
            {initialValues.codeUe}) &nbsp;
          </span>
        }
        subTitle={
          <div style={{ fontSize: "17px" }}>
            {"Enseigné par " +
              initialValues.prenomEnseignant.charAt(0).toUpperCase() +
              initialValues.prenomEnseignant.slice(1).toLowerCase() +
              " " +
              initialValues.nomEnseignant.toUpperCase()}
          </div>
        }
        tags={
          <div>
            {" "}
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
            <Tag color="blue" style={{ fontSize: "16px" }}>
              {"Promotion " +
                initialValues.codeFormation +
                " " +
                initialValues.anneeUniversitaire}
            </Tag>
          </div>
        }
      />
      <div></div>
      <br />

      <Form
        initialValues={initialValues}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        autoComplete="off"
        onFinish={(values) => handleFormSubmit(values)}
        onFinishFailed={onFinishFailed}
        style={{
          overflow: "visible",
        }}
      >
        <Form.Item
          label="N° Enseignant"
          name="noEnseignant"
          style={{ display: "none" }}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          label="N° Evaluation"
          name="noEvaluation"
          style={{ display: "none" }}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          label="Code Formation"
          name="codeFormation"
          style={{ display: "none" }}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item label="Code UE" name="codeUe" style={{ display: "none" }}>
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          label="Code Element Constitutif"
          name="codeEc"
          style={{ display: "none" }}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          label="Année Universitaire"
          name="anneeUniversitaire"
          style={{ display: "none" }}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          label="Désignation"
          name="designation"
          style={{ display: "none" }}
        >
          <Input />
        </Form.Item>
        <Form.Item label="État" name="etat" style={{ display: "none" }}>
          <Input />
        </Form.Item>
        <Row>
          <Col span={14}>
            <ConfigProvider locale={locale}>
              <Form.Item
                label="Précisez la période d'étude de cette unité d'enseignement"
                tooltip=""
                name="period"
                validateTrigger="onBlur"
                rules={[
                  {
                    type: "array",
                    required: true,
                    message:
                      "Veuillez saisir les dates de début et de fin de l'unité d'enseignement afin de pouvoir continuer!",
                  },
                ]}
              >
                <DatePicker.RangePicker
                  format="DD/MM/YYYY"
                  placeholder={["jj/mm/aaaa", "jj/mm/aaaa"]}
                  style={{ width: "400px" }}
                />
              </Form.Item>
            </ConfigProvider>
          </Col>
          <Col span={10}>
            <Form.Item
              label="Précisez la date de début et la date de fin pour répondre à l'évaluation"
              tooltip=""
              name="reponse"
              validateTrigger="onBlur"
              rules={[
                {
                  type: "array",
                  required: true,
                  message:
                    "Veuillez saisir les dates de début et de fin pour répondre à l'évaluation afin de pouvoir continuer!",
                },
              ]}
            >
              <DatePicker.RangePicker
                format="DD/MM/YYYY"
                placeholder={["jj/mm/aaaa", "jj/mm/aaaa"]}
                style={{ width: "400px" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Col offset={7}>
          <Form.Item
            label="Vous pouvez associer des rubriques à cette évaluation"
            name="rubriques"
            style={{ marginTop: "20px" }}
          >
            {data && rubriquesBis ? (
              <>
                <Space>
                  <Select
                    style={{ width: 340 }}
                    onChange={handleChange1}
                    value={selected}
                    placeholder="Sélectionner une rubrique"
                  >
                    {rubriquesBis.map((rubrique) => (
                      <Option value={rubrique} key={Math.random()}>
                        {rubrique}
                      </Option>
                    ))}
                  </Select>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                  />
                </Space>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <br />
                <Spin tip="Loading..." size="large" />
              </div>
            )}
          </Form.Item>
        </Col>
        {/* 
                      <Row>
            <Col>
              <Select
                style={{ width: 300 }}
                onChange={handleChange}
                value={selectedValue}
                placeholder="Sélectionner une rubrique"
              >
                {rubriquesTitle.map((rubrique) => (
                  <Select.Option
                    value={rubrique.idRubrique}
                    key={rubrique.idRubrique}
                    style={{ width: 500 }}
                  >
                    {rubrique.designation}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col>
              <Button
                onClick={addNewRubrique}
                icon={<PlusCircleTwoTone className="app-icon" />}
              />
            </Col>
          </Row>
        </Form.Item>
        {rubriques.map((rub, index) => (
          <Card key={index}>
            {rub.designation}
            <Button
              icon={<MinusCircleTwoTone twoToneColor="#ff4d4f" />}
              onClick={() => handleDelete(rub.idRubrique)}
              style={{ marginLeft: "25px" }}
            />
          </Card>
        ))}*/}
        <Col offset={6}>
          <ReactDragListView
            nodeSelector=".ant-list-item.draggble"
            onDragEnd={onDragEnd}
          >
            <List
              size="large"
              bordered
              style={{
                overflow: "auto",

                display: data.length == 0 ? "none" : "",
                width: "500px",
              }}
              dataSource={data}
              renderItem={(item) => {
                //
                const draggble =
                  item !== "Racing car sprays burning fuel into crowd.";
                return (
                  <List.Item
                    onDragStart={() => handleDragStart(item)}
                    onDragEnd={handleDragEnd}
                    // actions={["x"]}
                    className={draggble ? "draggble" : ""}
                  >
                    <Tooltip
                      placement="topRight"
                      title="Cliquer pour déplacer cette rubrique"
                    >
                      <MenuOutlined
                        style={{ float: "float", marginRight: "20px" }}
                      />
                    </Tooltip>
                    <List.Item.Meta title={item} />

                    <Tooltip
                      placement="topLeft"
                      title="Cliquer pour supprimer cette rubrique de l'evaluation en cours"
                    >
                      <Button
                        type="danger"
                        shape="circle"
                        icon={<MinusOutlined />}
                        style={{ float: "right" }}
                        size="small"
                        onClick={() => {
                          handleDelete2(item);
                        }}
                      />
                    </Tooltip>
                  </List.Item>
                );
              }}
            />
          </ReactDragListView>
        </Col>

        <Col offset={9}>
          <Form.Item style={{ marginTop: "20px" }}>
            <Button
              type="primary"
              shape="round"
              icon={<CheckOutlined />}
              size="large"
              htmlType="submit"
            >
              Valider
            </Button>
          </Form.Item>
        </Col>
      </Form>
    </div>
  );
}
