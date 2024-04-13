import { Badge, Descriptions } from "antd";
import moment from "moment";

export const DetailUsers = (Props:any) => {
    const { dataUser } = Props;
    return (
        <Descriptions
            title="Thông tin người dùng:"
            layout="horizontal"
            bordered
            column={1}
        >
        <Descriptions.Item label="ID" key={1}>
            {dataUser.id}
        </Descriptions.Item>
        <Descriptions.Item label="Email" key={2}>
            {dataUser.email}
        </Descriptions.Item>
        <Descriptions.Item label="Role" key={3}>
            <Badge status="processing" text={dataUser.role} />
        </Descriptions.Item>
        <Descriptions.Item label="Created At:" key={4}>
            {moment(dataUser.created_at).format("MMMM Do YYYY, h:mm:ss a")}
        </Descriptions.Item>
        <Descriptions.Item label="Tên hiển thị" key={5}>
            {dataUser.name}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại" key={6}>
            {dataUser.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Update At:" key={7}>
            {moment(dataUser.updated_at).format("MMMM Do YYYY, h:mm:ss a")}
        </Descriptions.Item>
        <Descriptions.Item label="Active:" key={8}>
            {dataUser.status}
        </Descriptions.Item>
        </Descriptions>
    )
}
