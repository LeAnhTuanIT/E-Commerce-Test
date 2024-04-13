import { Button, Drawer, Popconfirm, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, UndoOutlined } from "@ant-design/icons";
import { AdvancedSearchFormBook } from "./AdvancedSearchFormBook";
import { HeaderUsersTable } from "./HeaderUsersTable";
import { UserUpdate } from "./UserUpdate";
import { DetailUsers } from "./DetailUsers";
import { getAll, deleteUser, restore } from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import moment from 'moment';


export const UserTable = () => {

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [filters, setFilters] = useState([]);
    const [softs, setSofts] = useState("");

    const [openDetailUser, setOpenDetailUser] = useState(false);
    const [openModalUpdateUser, setOpenModalUpdateUser] = useState(false);
    const [dataUser, setDataUser] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAll() as unknown as AnyAction);
    }, []);
    const data = useSelector((state:any) => state?.user.listUser);
    

    const columns:any = [
        {
            title: "ID",
            width: 100,
            dataIndex: "id",
            key: "id",
            render: (text:any, record:any) => {
                return (
                    <a href="#" onClick={() => {setDataUser(record); setOpenDetailUser(true);}}>{text}</a>
                );
            },
        },
        {
            title: "Tên hiển thị",
            width: 100,
            dataIndex: "name",
            key: "name",
            sorter: {
                compare: (a:any, b:any) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 150,
            sorter: {
                compare: (a:any, b:any) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            width: 150,
            sorter: {
                compare: (a:any, b:any) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "updated_at",
            key: "updated_at",
            width: 150,
            sorter: {
                compare: (a:any, b:any) => a.chinese - b.chinese,
                multiple: 3,
            },
            render: (text: any) => moment(text).format("DD-MM-YYYY, h:mm:ss a")
        },
        {
            title: "Chức vụ",
            dataIndex: "role",
            key: "role",
            width: 80,
        },
        {
            title: "Thao tác",
            key: "action",
            fixed: "right",
            width: "88px",
            render: (text:any) => (
                <Space>
                    <Button
                        onClick={() => {
                            setOpenModalUpdateUser(true);
                            setDataUser(text);
                        }}size="small">
                        <EditOutlined
                            style={{
                                color: "#80ffd7",
                                cursor: "pointer",
                                fontSize: "20px",
                            }}
                        />
                    </Button>

                    <Button size="small">
                        <Popconfirm
                        title="Xóa người dùng!"
                        description="Bạn có chắc muốn xóa người dùng này không?"
                            onConfirm={async () => {
                                const res = await deleteUser(text.id);
                                if (res.status === 200) {
                                    setFilters([]);
                                    setSofts("");
                                    message.error(`Bạn đã xóa người dùng ${text.fullName}`);
                                    dispatch(getAll() as unknown as AnyAction);
                                }
                            }}
                        onCancel={(e) => {
                            console.log(e);
                        }}
                        okText="Vâng"
                        cancelText="Không"
                        >
                        <DeleteOutlined
                            style={{
                            color: "#FF8080",
                            marginLeft: "4px",
                            cursor: "pointer",
                            fontSize: "20px",
                            }}
                        />
                        </Popconfirm>
                    </Button>

                    <Button size="small">
                        <Popconfirm
                        title="Khôi phục người dùng!"
                        description="Bạn có chắc muốn khôi phục người dùng này không?"
                            onConfirm={async () => {
                                const res = await restore(text.id);
                                if (res.status === 200) {
                                    setFilters([]);
                                    setSofts("");
                                    message.success(`Khôi phục thành công ${text.fullName}`);
                                    dispatch(getAll() as unknown as AnyAction);
                                }
                            }}
                        onCancel={(e) => {
                            console.log(e);
                        }}
                        okText="Vâng"
                        cancelText="Không"
                        >
                        <UndoOutlined
                            style={{
                                color: "#80ffd7",
                                marginLeft: "4px",
                                cursor: "pointer",
                                fontSize: "20px",
                            }}
                        />
                        </Popconfirm>
                    </Button>
                </Space>
            ),
        },
      ];
  return (
        <>
            {/* <AdvancedSearchFormBook setFilters={setFilters} /> */}
            <HeaderUsersTable data={data} setFilters={setFilters} setSofts={setSofts}/>
            <Table
                style={{
                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                    padding: "4px",
                    borderRadius: "4px",
                }}
                columns={columns}
                dataSource={data.map((user:any)=> ({ ...user, key: user.id }))}
                pagination={{
                    defaultPageSize: 10,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    position: ["bottomRight"],
                    pageSizeOptions: ["10", "20", "30"],
                    showTotal: (total, range) => {
                        return (
                            <>
                                <Space size={6}>
                                    <div>{range[0]}-{range[1]}</div>trên {total} rows
                                </Space>
                            </>
                        );
                    },
                }}
                scroll={{ x: 1000, y: 700, scrollToFirstRowOnChange: true, }}
                // onChange={onChange}
            />
            <Drawer placement="right" onClose={() => { setOpenDetailUser(false);}} open={openDetailUser} width={"50%"}>
                <DetailUsers dataUser={dataUser} />
            </Drawer>
            <UserUpdate
                dataUser={dataUser}
                openModalUpdateUser={openModalUpdateUser}
                setFilters={setFilters}
                setOpenModalUpdateUser={setOpenModalUpdateUser}
            />
        </>
    )
}
