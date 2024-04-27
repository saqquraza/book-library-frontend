import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { ColumnsType } from 'antd/es/table';
import { Modal, Space } from 'antd';
import CommonTable from '../Common/CommonTable';
import { DeleteOutlined } from '@ant-design/icons';
import ApiUserModal from './ApiUserModal';
import "./ApiUser.css"
import Navbar from './Navbar';
import MobileDataCard from '../Common/MobileDataCard';
import {useMediaQuery} from 'react-responsive';

interface DataTypes {
  key: string;
  age: any;
  createdAt?: any;
  title: string;
  author: string;
  publishedYear: any;
  updatedAt?: any;
  viewDetails: string;
  delete: string;
  id: string
}

const ApiUser = () => {
  const [dataApi, setData] = useState<any>([]);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<{
    isOpen: boolean;
    id: string;
  }>({ isOpen: false, id: "0" });
  const isDesktop = useMediaQuery({ minWidth: 993 });

  //local url
  const BASE_URL = 'http://localhost:4000/booklibrary'

  const fetchData = async () => {
    try {
      const result = await axios.get(`${BASE_URL}`);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDelete = (id: string) => {
    Modal.confirm({
      title: "Delete User detail",
      icon: "",
      content: "Are you sure you want to delete? You can’t undo this action.",
      cancelText: "Cancel",
      okText: "Delete",
      centered: true,
      onOk: async () => {
        await axios.delete(`${BASE_URL}/${id}`)
        await fetchData();
      },
    });
  };



  const commonColumns: ColumnsType<DataTypes> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Published Year",
      dataIndex: "publishedYear",
      key: "publishedYear",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <p>{text}</p>
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => <p>{text}</p>
    },


  ]

  const columns: ColumnsType<DataTypes> = [
    ...commonColumns,
    {
      title: " ",
      key: "viewDetails",
      render: (_, { viewDetails }) => (
        <>
          <Space size="middle">
            <p
              style={{
                color: "#4B62BA",
                textDecoration: "underline",
                cursor: "pointer",
                margin: 0,
              }}
              onClick={() => {
                setIsEditModalOpen({ isOpen: true, id: viewDetails })
              }}
            >
              View Details
            </p>
          </Space>
        </>
      ),
    },
    {
      title: " ",
      key: "delete",
      render: (_, { viewDetails }) => (
        <>
          <Space
            size="middle"
            style={{ cursor: "pointer", color: "#D62828" }}
          >
            <DeleteOutlined onClick={() => {
              onDelete(viewDetails)
            }} />
          </Space>
        </>
      ),
    },
  ]

  const MobileColumns: ColumnsType<DataTypes> = commonColumns;

  const data: DataTypes[] = dataApi?.map((data: any) => {
    return {
      key: `${data.id}`,
      title: data?.title,
      author: data?.author,
      publishedYear: data?.publishedYear,
      createdAt: data?.createdAt ? new Date(data?.createdAt).toDateString() : '',
      updatedAt: data?.updatedAt ? new Date(data?.updatedAt).toDateString() : '',
      viewDetails: `${data.id}`,
      delete: `${data.id}`,
    }
  })



  return (
    <>
      <Navbar modalHandler={setIsModalOpen} />
      <Space direction='vertical' className='api-user-detail' style={{
        maxWidth: '950px',
        margin: 'auto',
      }}>
         {isDesktop ? (
                    <CommonTable columns={columns} data={data}  />
                ) : (
                    <>
                        {data.map((d: DataTypes) => {
                            return <MobileDataCard
                                columns={MobileColumns}
                                data={d}
                                onViewDetails={() => setIsEditModalOpen({ isOpen: true, id: d.viewDetails })}
                                onDelete={() => onDelete(d.viewDetails)}
                            />
                        })}
                    </>
                )}
        <ApiUserModal
          open={isAddModalOpen}
          onClose={() => setIsModalOpen(false)}
          modalTitle="Add new user"
          fetchData={fetchData}
        />
        <ApiUserModal
          open={isEditModalOpen.isOpen}
          onClose={() => setIsEditModalOpen({ isOpen: false, id: "0" })}
          modalTitle="Add new user"
          isEditMode={true}
          id={isEditModalOpen.id}
          fetchData={fetchData}
        />
      </Space>
    </>
  );
};

export default ApiUser;
