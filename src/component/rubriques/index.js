import React, { useState } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";

import { Table, Row, Col, Input, Button } from "antd";
import { arrayMoveImmutable } from "array-move";
import { PlusCircleFilled, MenuOutlined } from "@ant-design/icons";

const Rubriques = () => {
  const DragHandle = SortableHandle(() => (
    <MenuOutlined style={{ cursor: "grab", color: "#999" }} />
  ));
  const SortableItem = SortableElement((props) => <tr {...props} />);
  const SortableBody = SortableContainer((props) => <tbody {...props} />);

  const columns = [
    {
      title: "Sort",
      dataIndex: "sort",
      width: 30,
      className: "drag-visible",
      render: () => <DragHandle />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "drag-visible",
    },
  ];

  const data = [
    {
      key: 1,
      name: "Cours",
      index: 1,
    },
    {
      key: 2,
      name: "TPs",
      index: 2,
    },
    {
      key: 3,
      name: "TDs",
      index: 3,
    },
    {
      key: 4,
      name: "Stage",
      index: 4,
    },
  ];
  const [rubrique, setRubrique] = useState("");
  console.log("rubrique :>> ", rubrique);
  const [state, setState] = useState({ data, index: data.length + 1 });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const { data } = state;
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        [].concat(data),
        oldIndex,
        newIndex
      ).filter((el) => !!el);
      console.log("newData :>> ", newData);
      console.log("Sorted items: ", newData);
      setState({ ...state, data: newData });
    }
  };

  const DraggableContainer = (props) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    const { data } = state;
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = data.findIndex((x) => x.index === restProps["data-row-key"]);
    return <SortableItem index={index} {...restProps} />;
  };
  return (
    <>
      <Row justify="space-around">
        <Col>
          <Input
            placeholder="Ajouter rubrique ... "
            onChange={(e) => setRubrique(e.target.value)}
          />
        </Col>
        <Col>
          <Button
            icon={<PlusCircleFilled />}
            onClick={() =>
              setState({
                data: [
                  ...state.data,
                  {
                    key: state.index + 1,
                    index: state.index + 1,
                    name: rubrique,
                    className: "drag-visible",
                  },
                ],
                index: state.index + 1,
              })
            }
          >
            Ajouter
          </Button>
        </Col>
      </Row>
      <Table
        pagination={{ position: "center" }}
        rowKey={"index"}
        columns={columns}
        dataSource={state.data}
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      />
    </>
  );
};

export default Rubriques;
