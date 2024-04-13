import { Button, Col, Form, Input, Row, Space, theme } from "antd";
import { useState } from "react";

export const AdvancedSearchFormBook = (Props:any) => {
    
    const { setFilters } = Props;

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
                label: "Tên sách:",
                name: "mainText",
                placeholder: "Vui lòng nhập tên sách.",
            },
    
            {
                key: 2,
                label: "Tác giả:",
                name: "author",
                placeholder: "Vui lòng nhập tác giả.",
            },
            {
                key: 3,
                label: "Thể loại:",
                name: "category",
                placeholder: "Vui lòng nhập thể loại.",
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
        const { mainText, author, category } = values;
        if (mainText) {
            setFilters((state:any) => [...state, `&mainText=/${mainText.trim()}/i`]);
        }
        if (author) {
            setFilters((state:any) => [...state, `&author=/${author.trim()}/i`]);
        }
        if (category) {
            setFilters((state:any) => [...state, `&category=/${category.trim()}/i`]);
        }
    };
    return (
        <Form
            layout="vertical" className="mb-5" form={form} name="advanced_search" style={formStyle} onFinish={onFinishSearch}>
            <Row gutter={24}>{getFields()}</Row>
            <div
                style={{textAlign: "right",}}>
                <Space size="small">
                    <Button type="primary" htmlType="submit">Tìm kiếm</Button>
                    <Button onClick={() => {form.resetFields();}}>Dọn dẹp</Button>
                    <a style={{fontSize: 12,}} onClick={() => {setExpand(!expand);}}></a>
                </Space>
            </div>
        </Form>
    );
};
