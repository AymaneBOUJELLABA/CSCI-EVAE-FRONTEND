import "antd/dist/antd.css";

import { ALERT_TYPES, RUBRIQUES_WARNING_MESSAGES } from "../../shared/constant";
import {
  Button,
  Col,
  List,
  Row,
  Select,
  Space,
  Spin,
  Tooltip,
  message,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  MenuOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import React from "react";
import ReactDragListView from "react-drag-listview";

const { Option } = Select;

const key = "updatable";
const onShowAlert = (msg, type) => message[type](msg);
export default class DragDropRubriques extends React.Component {
  state = {
    dataB: [],
    data: [],
    dataF: [],
    rubriques: [],
    rubriquesBis: [],
    selected: "",
    options: {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
    optionsU: {
      method: "PUT",

      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    },
    loading: false,
  };

  handleDragStart = (item) => {
    // this.setState({color:"blue"});
    console.log("start");
    console.log(item);
  };

  handleDragEnd = () => {
    // this.setState({color:"red"});
    console.log("end");
    console.log(this.state.data);
  };

  handleClick = () => {
    //this.setState({dataF:[]});
    let dataF = [];
    let i = 1;
    this.state.data.map((elt) => {
      let eltF = {};
      eltF.ordre = i;
      eltF.designation = elt;

      dataF.push(eltF);
      i++;
    });
    this.state.rubriques.map((elt) => {
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
    this.state.dataF.rubriques = dataF;
    console.log("this.state.dataF", this.state.dataF);
    //this.setState({dataF[rubriques]:dataF});
    //window.location.href=`/`;
    this.editEvaluation();
    this.props.handleCancel();
  };

  editEvaluation = () => {
    this.state.optionsU.body = JSON.stringify(this.state.dataF);

    //console.log("loading",this.state.loading);

    fetch(
      "/api/evaluations/" + this.props.evaluation.idEvaluation,
      this.state.optionsU
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        console.log(this.state.optionsU);
        onShowAlert(RUBRIQUES_WARNING_MESSAGES.MODIFIED, ALERT_TYPES.SUCCESS);
      })
      .catch((err) => console.error(err));
    /*console.log("this.state.optionsU",this.state.optionsU);
  this.openMessage();
  this.props.closeUpdate();*/
  };

  componentDidMount = () => {
    this.setState({ evaluation: this.props.evaluation });
    console.log("cc");
    console.table(this.props.evaluation);
    this.loadData1();
    //this.loadData2();
  };

  loadData1 = () => {
    let designations = this.props.evaluation.rubriques.map(
      (elt) => elt.designation
    );
    this.setState({
      dataB: this.props.evaluation.rubriques,
      data: designations,
      dataF: this.props.evaluation,
    });
    this.state.data && this.loadData2();
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

  loadData2 = () => {
    fetch("/api/evaluations/rubriques", this.state.options)
      .then((response) => response.json())
      .then((response) => {
        let designations = response.map((elt) => elt.designation);
        // console.log("this.state.data",this.state.data);
        // console.log("this.state.designations",designations);
        // console.log("this.state.rubriquesBis",this.state.rubriquesBis);
        this.setState({
          rubriquesBis: designations.filter(
            (value) => !this.state.data.includes(value)
          ),
          rubriques: response,
        });

        // console.log("RUBRIQUES",this.state.rubriques);
        // console.log("RUBRIQUESBIS",this.state.rubriquesBis);
        // console.log('this.state.rubriquesBis', this.state.rubriquesBis)
      })
      .catch((err) => console.error(err));
  };

  handleDelete = (item) => {
    console.log(item);
    var array = [...this.state.data]; // make a separate copy of the array
    var index = array.indexOf(item);
    console.log(index);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ data: array });
    }
    var array = [...this.state.rubriquesBis]; // make a separate copy of the array

    array.push(item);
    this.setState({ rubriquesBis: array });
  };

  onDragEnd = (fromIndex, toIndex) => {
    if (toIndex < 0) return; // Ignores if outside designated area

    const items = [...this.state.data];
    const item = items.splice(fromIndex, 1)[0];
    items.splice(toIndex, 0, item);
    this.setState({ data: items });
  };

  handleChange = (value) => {
    console.log(`selected ${value}`);
    this.setState({ selected: value });
  };

  handleAdd = (e) => {
    e.preventDefault();
    if (this.state.selected != "") {
      console.log(this.state.selected);
      var array = [...this.state.data]; // make a separate copy of the array
      array.push(this.state.selected);
      this.setState({ data: array });
      this.editData(this.state.selected);
      this.setState({ selected: "" });
    }
  };

  editData = (value) => {
    this.setState({
      rubriquesBis: this.state.rubriquesBis.filter((e) => e != value),
    });
  };

  handleCancel = () => {
    console.log("annuler mod");
    this.props.handleCancel();
  };

  openMessage = () => {
    message.loading({ content: "Modifiant l'évaluation...", key });
    setTimeout(() => {
      message.success({ content: "Evaluation modifiée!", key, duration: 3 });
    }, 1000);
  };

  render() {
    return (
      <>
        {this.state.data && this.state.rubriquesBis ? (
          <>
            <div>
              <h3 style={{ marginTop: "23px" }}>
                <EditOutlined /> &nbsp; Modifier l'évaluation
              </h3>
              <ReactDragListView
                nodeSelector=".ant-list-item.draggble"
                onDragEnd={this.onDragEnd}
              >
                <List
                  size="large"
                  bordered
                  dataSource={this.state.data}
                  style={{ marginTop: "8px" }}
                  renderItem={(item) => {
                    //
                    const draggble =
                      item !== "Racing car sprays burning fuel into crowd.";
                    return (
                      <List.Item
                        onDragStart={() => this.handleDragStart(item)}
                        onDragEnd={this.handleDragEnd}
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
                              this.handleDelete(item);
                            }}
                          />
                        </Tooltip>
                      </List.Item>
                    );
                  }}
                />
              </ReactDragListView>
            </div>

            <Row style={{ marginTop: "110px" }}>
              <Col offset={6}>
                <Space>
                  <Select
                    style={{ width: 270 }}
                    onChange={this.handleChange}
                    value={this.state.selected}
                    placeholder="Sélectionner une rubrique"
                  >
                    {this.state.rubriquesBis.map((rubrique) => (
                      <Option value={rubrique} key={Math.random()}>
                        {rubrique}
                      </Option>
                    ))}
                  </Select>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={this.handleAdd}
                  />
                </Space>
              </Col>
            </Row>
            <Row style={{ marginTop: "90px" }}>
              <Col span={6} offset={5}>
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  size="large"
                  onClick={this.handleClick}
                >
                  Valider
                </Button>
              </Col>
              <Col span={6} offset={1}>
                <Button
                  icon={<CloseOutlined />}
                  size="large"
                  onClick={this.handleCancel}
                >
                  Annuler
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <br />
            <Spin tip="Loading..." size="large" />
          </div>
        )}
      </>
    );
  }
}
