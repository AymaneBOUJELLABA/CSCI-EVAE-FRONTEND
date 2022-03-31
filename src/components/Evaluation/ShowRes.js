import "antd/dist/antd.css";
import { Alert, Col, Collapse, Divider, Row, Tag } from "antd";
import React from "react";
import { useParams } from "react-router";
import withRouter from "../withRouter";
const { Panel } = Collapse;

class ShowRes extends React.Component {
  state = {
    queryParams: new URLSearchParams(window.location.search),
    id: 0,
    data: [],
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
    loading: false,
  };

  async fetchRes() {
    const id = this.props.match.params.id;
    const response = await fetch(
      "http://localhost:8082/api/evaluations/statEval/" + id,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    json.map((elt, index) => {
      elt.key = index;
    });

    return json;
  }
  componentDidMount = () => {
    console.table(this.props);
    console.table(this.props.router);
    const id = this.props.router.params.id;

    fetch("http://localhost:8082/api/evaluations/statEval/" + id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
        this.setState({ data: response, loading: true });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div style={{ height: 300, width: "100%" }}>
        <h2>Résultat de l'évaluation de l'UE: {this.state.data.codeUe} </h2>
        <h3 style={{ color: "steelblue", fontWeight: "bold" }}>
          {this.state.data.codeFormation} -{this.state.data.anneeUniversitaire}{" "}
        </h3>
        <Collapse>
          {this.state.loading &&
            this.state.data.rubriques.map((rubrique) => {
              return (
                <Panel
                  header={rubrique.designation}
                  key={rubrique.idRubrique}
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  <Row style={{ fontSize: "15px", fontWeight: "normal" }}>
                    <Col
                      span={8}
                      style={{
                        display: "inline",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Question
                    </Col>
                    <Col
                      span={4}
                      style={{
                        display: "inline",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Minimum
                    </Col>
                    <Col
                      span={1}
                      style={{
                        display: "inline",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      1
                    </Col>
                    <Col
                      span={1}
                      style={{
                        display: "inline",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      2
                    </Col>
                    <Col
                      span={1}
                      style={{
                        display: "inline",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      3
                    </Col>
                    <Col
                      span={1}
                      style={{
                        display: "inline",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      4
                    </Col>
                    <Col
                      span={1}
                      style={{
                        display: "inline",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      5
                    </Col>
                    <Col
                      span={4}
                      style={{
                        display: "inline",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      Maximum
                    </Col>
                    <Col
                      span={2}
                      style={{
                        display: "inline",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      Moyenne
                    </Col>
                    <Divider />
                  </Row>
                  {rubrique.questions.length < 1 ? (
                    <Alert
                      showIcon
                      type="info"
                      description="Aucune question disponible pour cette rubrique"
                      message=""
                    />
                  ) : (
                    rubrique.questions.map((ques) => {
                      return (
                        <div key={ques.idQuestion}>
                          <Row
                            gutter={[[64, 64]]}
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              fontFamily: "Garamond",
                              textAlign: "center",
                            }}
                          >
                            <Col span={8} style={{ display: "inline" }}>
                              {ques.intitule}
                            </Col>
                            <Col span={4} style={{ display: "inline" }}>
                              <Tag
                                style={{ width: "8em", textAlign: "center" }}
                                color="blue"
                              >
                                {ques.qualificatif.maximal}
                              </Tag>
                            </Col>
                            {ques.nbrPos1 > 0 && ques.nbrPos1 == ques.max ? (
                              <Col
                                span={1}
                                style={{
                                  display: "inline",
                                  background: "yellow",
                                }}
                              >
                                {" "}
                                {ques.nbrPos1}
                              </Col>
                            ) : (
                              <Col span={1} style={{ display: "inline" }}>
                                {" "}
                                {ques.nbrPos1}
                              </Col>
                            )}

                            {ques.nbrPos2 > 0 && ques.nbrPos2 == ques.max ? (
                              <Col
                                span={1}
                                style={{
                                  display: "inline",
                                  background: "yellow",
                                }}
                              >
                                {" "}
                                {ques.nbrPos2}
                              </Col>
                            ) : (
                              <Col span={1} style={{ display: "inline" }}>
                                {" "}
                                {ques.nbrPos2}
                              </Col>
                            )}

                            {ques.nbrPos3 > 0 && ques.nbrPos3 == ques.max ? (
                              <Col
                                span={1}
                                style={{
                                  display: "inline",
                                  background: "yellow",
                                }}
                              >
                                {" "}
                                {ques.nbrPos3}
                              </Col>
                            ) : (
                              <Col span={1} style={{ display: "inline" }}>
                                {" "}
                                {ques.nbrPos3}
                              </Col>
                            )}

                            {ques.nbrPos4 > 0 && ques.nbrPos4 == ques.max ? (
                              <Col
                                span={1}
                                style={{
                                  display: "inline",
                                  background: "yellow",
                                }}
                              >
                                {" "}
                                {ques.nbrPos4}
                              </Col>
                            ) : (
                              <Col span={1} style={{ display: "inline" }}>
                                {" "}
                                {ques.nbrPos4}
                              </Col>
                            )}

                            {ques.nbrPos5 > 0 && ques.nbrPos5 == ques.max ? (
                              <Col
                                span={1}
                                style={{
                                  display: "inline",
                                  background: "yellow",
                                  marginRight: "2pt",
                                }}
                              >
                                {" "}
                                {ques.nbrPos5}
                              </Col>
                            ) : (
                              <Col
                                span={1}
                                style={{
                                  display: "inline",
                                  marginRight: "2pt",
                                }}
                              >
                                {" "}
                                {ques.nbrPos5}
                              </Col>
                            )}
                            <Col span={4} style={{ display: "inline" }}>
                              {" "}
                              <Tag
                                style={{ width: "8em", textAlign: "center" }}
                                color="red"
                              >
                                {ques.qualificatif.minimal}
                              </Tag>
                            </Col>
                            <Col span={2} style={{ display: "inline" }}>
                              {" "}
                              {ques.moyenne}
                            </Col>
                            <Divider
                              style={{ marginTop: "1pt", marginBottom: "1pt" }}
                            />
                          </Row>
                        </div>
                      );
                    })
                  )}
                </Panel>
              );
            })}
        </Collapse>
      </div>
    );
  }
}
export default withRouter(ShowRes);
