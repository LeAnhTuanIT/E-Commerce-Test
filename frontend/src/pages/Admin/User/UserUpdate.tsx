import {Button,Divider,Form,Input,Modal,message,notification, Select} from "antd";
import { useEffect, useState } from "react"
import { updateUser, getAll } from "../../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";

export const UserUpdate = (Props:any) => {
    const { dataUser, setFilters, openModalUpdateUser, setOpenModalUpdateUser } = Props;
    const [form] = Form.useForm();
    const [submit, setSubmit] = useState(false);
    const { Option } = Select;
    const [role, setRole] = useState();

    useEffect(() => {
        form.setFieldsValue(dataUser);
    }, [dataUser, form]);
    const dispatch = useDispatch();
    const onFinish = async ({ id, name }: any) => {
        id = dataUser.id;
        setSubmit(true);
        try {
            const response = await updateUser(id, name, role);
            console.log(`response:`, response);
            if (response.status === 200 || response.status === 201) {
                setOpenModalUpdateUser(false);
                message.success("Bạn đã sửa thành công!");
                form.resetFields();
                dispatch(getAll() as unknown as AnyAction);
            } else {
                notification.error({
                    message: "Có lỗi xảy ra!",
                    description: (response as any).message,
                });
            }
        } catch (error: any) {
            console.log(`error:`, error);
            notification.error({
                message: "Có lỗi xảy ra!",
                description: error.response.data.message,
            });
        } finally {
            setSubmit(false);
        }
    };
    

    const onFinishFailed = (errorInfo:any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Modal
            title="Cập nhật người dùng:"
            forceRender
            open={openModalUpdateUser}
            onCancel={() => setOpenModalUpdateUser(false)}
            maskClosable={false}
            footer={[
                <Button key={1} size="large" onClick={() => { setOpenModalUpdateUser(false);}}>Hủy bỏ</Button>,<Button key={2} size="large" type="primary" className="bg-blue-500"
                onClick={() => { setFilters([]);form.submit();}}loading={submit}>Xác nhận</Button>,
            ]}
            centered
        >
        {
            <Form
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                action="#"
                form={form}
                initialValues={{ id: dataUser.id, email: dataUser.email, name: dataUser.name, role: dataUser.role }}
            >
            <Divider />
            <Form.Item hidden label="ID" name="id">
                <Input className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" disabled/>
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" placeholder={dataUser.email} disabled/>
            </Form.Item>

                <Form.Item
                    label="Tên đầy đủ"
                    name="name"
                    className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: "Vui lòng nhập tên của bạn!",
                    //     },
                    // ]}
                >
                    <Input className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" placeholder={dataUser.name}/>
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Role"
                    >
                    <Select
                        placeholder={dataUser.role}
                        onChange={(value) => {
                            setRole(value);
                        }}
                        defaultValue={dataUser.role}
                        showSearch
                    >
                        <Option key="admin" value="admin">Admin</Option>
                        <Option key="user" value="user">User</Option>
                    </Select>
                </Form.Item>
            </Form>
        }
        </Modal>
    );
};
