import { Alert, Button, Modal } from 'antd';
import React, { useState } from 'react';

import { Dialog } from '@mui/material';
import DragDropRubriques from './dragDropRubriques';

export default function EditEvaluation() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
   {/*<Alert message="Evaluation modifiée avec succès" type="success" showIcon closable /> */} 
      <Button type="primary" onClick={showModal}>
        Modifier
      </Button>
      <Dialog visible={isModalVisible} footer="" onCancel={handleCancel} /*width={700}*/>
        <DragDropRubriques />
      </Dialog>
    </>
  );
};