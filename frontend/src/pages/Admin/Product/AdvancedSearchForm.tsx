import { Button, Col, Form, Input, Row, Space, theme } from "antd";
import { useState } from "react";

export const AdvancedSearchForm = ({ setFilters }:any) => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [expand, setExpand] = useState(false);
    const formStyle = {
        maxWidth: "none",
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };
    const getFields = () => {
        const inputSearch = [
            {
                key: 1,
                label: "Tên hiển thị",
                name: "fullName",
                placeholder: "Vui lòng nhập từ tìm kiếm.",
            },
    
            {
                key: 2,
                label: "Email",
                name: "email",
                placeholder: "Vui lòng nhập email.",
            },
            {
                key: 3,
                label: "Số điện thoại",
                name: "phoneNumber",
                placeholder: "Vui lòng nhập số điện thoại.",
            },
        ];
  
        return inputSearch.map((item) => {
            return (
                <Col span={8} key={item.key}>
                    <Form.Item
                        name={item.name}
                        label={item.label}
                        rules={[
                            {
                                message: "Input something!",
                            },
                        ]}
                        >
                        <Input placeholder={item.placeholder} />
                    </Form.Item>
                </Col>
            );
        });
    };
    const onFinishSearch = (values:any) => {
        console.log("Received values of form: ", values);
        const { fullName, email, phoneNumber } = values;
        if (fullName) {
            setFilters((state:any) => [...state, `&fullName=/${fullName.trim()}/i`]);
        }
        if (email) {
            setFilters((state:any) => [...state, `&email=/${email.trim()}/i`]);
        }
        if (phoneNumber) {
            setFilters((state:any) => [...state, `&phone=/${phoneNumber.trim()}/i`]);
        }
    };
    return (
        <Form className="mb-5" form={form} name="advanced_search" style={formStyle} onFinish={onFinishSearch}>
            <Row gutter={24}>{getFields()}</Row>
            <div style={{textAlign: "right",}}>
                <Space size="small">
                    <Button className="bg-blue-500" type="primary" htmlType="submit">Tìm kiếm</Button>
                    <Button onClick={() => {form.resetFields();}}>Dọn dẹp</Button>
                    <a style={{fontSize: 12,}}onClick={() => {setExpand(!expand);}}></a>
                </Space>
            </div>
        </Form>
    );
};
