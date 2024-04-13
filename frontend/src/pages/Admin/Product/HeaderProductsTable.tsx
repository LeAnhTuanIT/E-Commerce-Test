import { ReloadOutlined, WalletOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useState } from "react";
import { ProductAdd } from "./ProductAdd";
import * as XLSX from "xlsx";

export const HeaderProductsTable = (Props:any) => {
    const { data, setFilters, setSofts } = Props;
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    return (
        <>
            <Space className="flex justify-end py-4">
                <Button className="bg-blue-500"
                    type="primary"
                    size={"large"}
                    onClick={() => {
                    const worksheet = XLSX.utils.json_to_sheet(data);
                    const workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
                    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
                    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
                    XLSX.writeFile(workbook, "DataSheet.csv");
                    }}
                >
                    <WalletOutlined />
                    Xuất dữ liệu
                </Button>
                <Button size={"large"}onClick={() => {setIsModalOpen(true);}}>Thêm mới</Button>
        
                <Button size={"large"} style={{border: "none",padding: "4px",}}>
                    <ReloadOutlined style={{ fontSize: "20px", margin: "0 4px", cursor: "pointer" }}onClick={() => {setFilters([]);setSofts("-updatedAt");}}/>
                </Button>
            </Space>
            <ProductAdd setFilters={setFilters} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        </>
    );
};
