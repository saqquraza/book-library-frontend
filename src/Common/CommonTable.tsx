import React from 'react';
import { Table } from 'antd';
import './CommonTable.css';

interface CommonTableProps {
    columns: any[];
    data: any[];
    rowSelection?: any;
    rowKey?: string;
    scroll?: any;
    rowClassName?:any;
}

const CommonTable: React.FC<CommonTableProps> = ({ columns, data, scroll, ...props }) => {

    function rowClassName(record: any, index: number) {
        return index % 2 === 0 ? 'even-row' : 'odd-row';
      }
    return (
        <Table
        style={{
            marginTop: "20px"
        }}
            columns={columns}
            dataSource={data}
            bordered
            scroll={scroll}
            rowClassName={rowClassName}
            size="small"
            pagination={{ position: ['bottomCenter'] }}
            {...props}
        />
    )
}

export default CommonTable