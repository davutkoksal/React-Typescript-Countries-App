import React, { useState } from "react";
import { Modal, Button, Table } from "antd";
import { ModalObj } from "./Mainpage";

interface ModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (num: boolean) => void;
  list: ModalObj[];
}

const CountryDetailModal: React.FC<ModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  list,
}) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const columns = [
    {
      title: "Ülke Adı",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Başkent",
      dataIndex: "capital",
      key: "capital",
    },
    {
      title: "Kıta",
      dataIndex: "continentName",
      key: "continentName",
    },
  ];
  return (
    <>
      <Modal
        title="Aynı Dili Konuşan Ülkeler"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"60%"}
      >
        <Table rowKey={"code"} columns={columns} dataSource={list} />
      </Modal>
    </>
  );
};
export default CountryDetailModal;
