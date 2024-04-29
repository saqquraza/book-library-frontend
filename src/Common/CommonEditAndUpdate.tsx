import { EditOutlined } from '@ant-design/icons'
import { Button, Space, Typography } from 'antd'
import React from 'react'
import Search from 'antd/lib/transfer/search'
 import './CommonEditAndUpdate.css'

const { Title, Text } = Typography;

interface Props {
    buttonTitle: string,
        isIcon?: boolean,
    onAddNewForm: () => void,
    subTitle: string
}

const CommonEditAndUpdate: React.FC<Props> = ({ buttonTitle,subTitle, isIcon, onAddNewForm }) => {
    return (
        <Space className='space-btn' >
            <Title level={5}>
                        {subTitle}
                    </Title>
            {onAddNewForm  &&
                <Button
                    onClick={onAddNewForm}
                    style={{color:"yellow",backgroundColor:'black'}}
                // disabled={props.submitPermission}
                >
                    {buttonTitle}
                    {
                        isIcon ?
                            <EditOutlined />
                            :
                            ' + '
                    }
                </Button>}
        </Space>
    )
}

export default CommonEditAndUpdate
