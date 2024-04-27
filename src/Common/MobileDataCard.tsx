import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Card, Col, Divider, Row, Space } from "antd";
import { ColumnsType } from "antd/es/table";
// import { reduceString } from "../../../utils/common";
import './MobileDataCard.css';

interface MobileDataCardProps {
  columns: ColumnsType<any>;
  data: any;
  onViewDetails?: () => void;
  onDelete?: () => void;
}

const MobileDataCard = ({ columns, data, onDelete, onViewDetails }: MobileDataCardProps) => {
     const reduceString = (size: number, str: string) => {
        let trimmedString = str.length > size ? str.substring(0, size - 1) + "..." : str;
        return trimmedString
    }

  return (
    <Card className="mobile-data-card">
      {columns?.map((column: any) => {
        return (
          <>
            <Row gutter={2}>
              <Col span={8} className="gutter-row" style={{ fontSize: "14px", fontWeight: "600" }}>
                {column.title}
              </Col>
              <Col className="gutter-row" span={1} style={{ fontSize: "14px" }}>
                :
              </Col>
              <Col span={10} className="gutter-row" style={{ fontSize: "15px" }}>
                {column.render ? (
                  <>
                    {column.render(data[column.key])}
                  </>
                ) : (
                  <>
                    {reduceString(22, `${data[column.key] || ""}`)}
                  </>
                )}
              </Col>
            </Row>
          </>
        );
      })}
      <Divider style={{ backgroundColor: "#D3DAFA", margin: "5px 0px " }}></Divider>
      <Row gutter={8}>
        <Col span={10}>
          {onViewDetails && <label
            className="mobile-label"
            onClick={onViewDetails}
          >
            View Details
          </label>}
        </Col>
        <Col span={6}></Col>
        <Col span={4}>
          {onDelete &&
            <Space size="middle" style={{ cursor: "pointer", color: "#D62828" }}>
              <DeleteOutlined onClick={onDelete} />
            </Space>}
        </Col>
      </Row>
    </Card>
  );
};

export default MobileDataCard;