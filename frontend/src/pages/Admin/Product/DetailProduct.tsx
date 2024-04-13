import { Badge, Descriptions, Divider, Modal, Upload } from "antd";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

const getBase64 = (file:any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const DetailProduct = (Props:any) => {
  const { dataBook } = Props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const { thumbnail_image, detail_image } = dataBook;

    useEffect(() => {
        const mergeThumbnailAndSlider = [thumbnail_image, ...detail_image];
        const listImage:any = mergeThumbnailAndSlider.map((item) => {
            return {
                uid: uuidv4(),
                name: "image.png",
                status: "done",
                url: item,
            };
        });

        setFileList(listImage);
    }, [dataBook, thumbnail_image,detail_image]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file:any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  };

  return (
    <>
      <Descriptions title="Thông tin sách:" layout="horizontal" bordered column={1}>
        <Descriptions.Item label="ID" key={1}>
          {dataBook.id}
        </Descriptions.Item>

        <Descriptions.Item label="Tên sách" key={2}>
          {dataBook.name}
        </Descriptions.Item>

        <Descriptions.Item label="Thể loại" key={3}>
          <Badge status="processing" text={dataBook.category} />
        </Descriptions.Item>
        <Descriptions.Item label="Nội dung" key={4}>
          <div dangerouslySetInnerHTML={{ __html: dataBook.description }} />
        </Descriptions.Item>

        <Descriptions.Item label="Created At:" key={5}>
          {moment(dataBook.created_at).format("MMMM Do YYYY, h:mm:ss a")}
        </Descriptions.Item>

        <Descriptions.Item label="Tác giả" key={6}>
          {dataBook.author}
        </Descriptions.Item>

        <Descriptions.Item label="Giá tiền" key={7}>
          {`${dataBook.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND
        </Descriptions.Item>

        <Descriptions.Item label="Số lượng" key={8}>
          {dataBook.quantity}
        </Descriptions.Item>

        <Descriptions.Item label="Đã bán" key={9}>
          {dataBook.sold}
        </Descriptions.Item>

        <Descriptions.Item label="Update At:" key={10}>
          {moment(dataBook.updated_at).format("MMMM Do YYYY, h:mm:ss a")}
        </Descriptions.Item>
        <Descriptions.Item label="Active:" key={11}>
            {dataBook.status}
        </Descriptions.Item>
      </Descriptions>

      <Divider style={{ fontWeight: "bold" }} orientation="left" plain>
        Ảnh sách
      </Divider>

      <Upload listType="picture-card" fileList={fileList} onPreview={handlePreview} showUploadList={{ showRemoveIcon: false }} />

      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};
