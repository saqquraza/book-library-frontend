import { Col, Form, Input, message, Modal, Row } from 'antd'
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { apiTypes } from '../Service/apiTypes';

interface Props {
  onClose: () => void;
  open: boolean;
  modalTitle: string;
  id?: string;
  isEditMode?: boolean;
  fetchData: () => Promise<void>;
}


const ApiUserModal: React.FC<Props> = ({
  onClose,
  open,
  id,
  isEditMode,
  fetchData
}) => {
  const [form] = useForm();
  const [userDetails, setUserDetails] = useState<any>({});
  const BASE_URL = 'http://localhost:4000/booklibrary'

  const fetchUserDetailsById = async () => {
    if (id !== '0') {
      try {
        const bookData = await axios.get(`${BASE_URL}/${id}`);
        setUserDetails(bookData.data);
      } catch (err: any) {
        console.error(false);
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserDetailsById();
    }
  }, [id]);


  useEffect(() => {
    if (userDetails) {
      form.setFieldValue("title", userDetails?.title);
      form.setFieldValue("author", userDetails?.author);
      form.setFieldValue("publishedYear", userDetails?.publishedYear);
    }
  }, [userDetails]);

  const handleEditUserDetail = async (value: apiTypes) => {
    console.log(value)
    if (id) {
      try {
        const resp = await axios.put(`${BASE_URL}/${id}`, {
          title: value.title,
          author: value.author,
          publishedYear: parseInt(value?.publishedYear)
        });
        await fetchData();
        form.resetFields();
        onClose();
        message.success(
          resp?.data?.message || "Updated Book info successfully"
        );
      } catch (err: any) {
        console.error(err);
        message.error(err?.response?.data?.message || "Something went wrong!");
      }
    }
  };

  const handleSubmit = async (value: apiTypes) => {
    {
      try {
        // const resp = await axios.post(`${BACKEND_URI}`, {
        const resp = await axios.post(`${BASE_URL}`, {
          title: value.title,
          author: value.author,
          publishedYear: parseInt(value?.publishedYear)
        });
        const res = await fetchData();
        form.resetFields();
        onClose();
        message.success(
          resp?.data?.message || "Added Book successfully"
        );
      } catch (error: any) {
        message.error(error.response?.data?.message || "Something went wrong!");

      }
    }
  };
  const resetStates = () => {
    setUserDetails({} as any)
    form.resetFields();
  }

  return (
    <Modal
      title="Book Info"
      open={open}
      onCancel={() => {
        onClose();
        resetStates()
      }}
      onOk={() => form.submit()}
      okText={'Save'}
      cancelText={'Cancel'}
    >
      <Form
        layout="vertical"
        onFinish={isEditMode && id ? handleEditUserDetail : handleSubmit}
        form={form}
      >
        <Row gutter={[20, 0]}>
          <Col xs={24} >
            <Form.Item label="Book Title" name={"title"} rules={[{ required: true, message: 'Please enter Book name!' }]}>
              <Input
                placeholder="Enter Book Title"
              />
            </Form.Item>
          </Col>
          <Col xs={24} >
            <Form.Item label="Book Author" name={"author"}>
              <Input
                placeholder="Enter book author"
              />
            </Form.Item>
          </Col>
          <Col xs={24} >
            <Form.Item label="Book Published Year" name={"publishedYear"} >
              <Input
                type='number'
                placeholder="Enter book published year"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

    </Modal>

  )
}

export default ApiUserModal