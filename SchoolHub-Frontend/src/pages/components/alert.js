import React, { useState } from 'react';
import AlertConfirm from 'react-alert-confirm';

const ConfirmAlert = () => {
  const [visible, setVisible] = useState(true);

  return (
    <AlertConfirm
      visible={visible}
      title="Are you sure?"
      desc="description..."
      onOk={() => {
        console.log('ok');
        setVisible(false);
      }}
    />
  );
};

export default ConfirmAlert;