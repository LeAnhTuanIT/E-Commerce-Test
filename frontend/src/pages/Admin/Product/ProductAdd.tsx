import React, { useState } from 'react';
import { Button, Col, Divider, Form, Input, InputNumber, Modal, Row, Upload, message, notification, Select } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { productAdd, getAllProduct } from '../../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';

export const ProductAdd = (Props: any) => {
    const dispatch = useDispatch();
    const listCategory = useSelector((state:any) => state?.product.listProduct.categories);
    const [category, setCategory] = useState<any>(null);

    const handleSelectChange = (value: any) => {
        setCategory(value);
    };
    const { setFilters, isModalOpen, setIsModalOpen } = Props;

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [form] = Form.useForm();
    const [fileListThumbnail, setFileListThumbnail] = useState<any[]>([]);
    const [fileListSlider, setFileListSlider] = useState<any[]>([]);
    const [imageUrl, setImageUrl] = useState('');
    const [submit, setSubmit] = useState(false);
    const [description, setDescription] = useState('');

    const onFinish = (values: any) => {
        if (fileListThumbnail.length < 1 || fileListSlider.length < 1) {
            message.error('Không được để trống ảnh!');
            return;
        }
        const formData = new FormData();
        const dataInputAddBook = {
            name: values.mainText,
            description: description,
            price: values.price,
            category: category,
            author: values.author,
            quantity: values.quantity,
        };
        formData.append('data', JSON.stringify(dataInputAddBook));
        fileListSlider.forEach((file, index) => {
            formData.append(`file[${index}]`, file.originFileObj);
        });
        formData.append('thumbnail_image', fileListThumbnail[0].originFileObj);

        (async function () {
            setSubmit(true);
            try {
                const response = await productAdd(formData);
                if (response.status === 200 || response.status === 201) {
                    setIsModalOpen(false);
                    message.success('Đã tạo sách thành công!');
                    form.resetFields();
                    setFileListThumbnail([]);
                    setFileListSlider([]);
                    setSubmit(false);
                    setFilters([]);
                    dispatch(getAllProduct() as unknown as AnyAction);
                } else {
                    notification.error({
                        message: 'Có lỗi xảy ra!',
                        description: (response as any).message,
                    });
                }
            } catch (error:any) {
                console.log('error:', error);
                notification.error({
                    message: 'Có lỗi xảy ra!',
                    description: error.response.data.message,
                });
            }
            setSubmit(false);
        })();
    };

    const handleChange = ({ fileList }: any) => {
        setFileListSlider(fileList);
    };

    const handleChangee = ({ fileList }: any) => {
        setFileListThumbnail(fileList);
        if (fileList.length > 0) {
            const uploadedFile = fileList[0];
            const { response } = uploadedFile;
            if (response && response.status === 'success') {
                const imageUrl = response.imageUrl;
                setImageUrl(imageUrl);
            }
        }
    };

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        setPreviewOpen(true);
    };

    const getBase64 = (file: any) =>
        new Promise<string | ArrayBuffer | null>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image', 'video'],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
    ];

    return (
        <Modal
            title="Thêm sách:"
            open={isModalOpen}
            onCancel={() => {
                setIsModalOpen(false);
                form.resetFields();
                setFileListThumbnail([]);
                setFileListSlider([]);
            }}
            maskClosable={false}
            width={'50vw'}
            footer={[
                <Divider key={'dividerModalAddBook'} />,
                <Button
                    key={1}
                    size="large"
                    onClick={() => {
                        setIsModalOpen(false);
                        form.resetFields();
                        setFileListThumbnail([]);
                        setFileListSlider([]);
                    }}
                >
                    Hủy bỏ
                </Button>,
                <Button
                    className='bg-blue-500'
                    key={2}
                    size="large"
                    type="primary"
                    onClick={() => {
                        form.submit();
                    }}
                    loading={submit}
                >
                    Xác nhận
                </Button>,
            ]}
            centered
        >
            {
                <Form
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <Divider />
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                                label="Tên Sách:"
                                name="mainText"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên sách',
                                    },
                                ]}
                            >
                                <Input
                                    className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                                    placeholder="Vui lòng nhập tên sách"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Tác giả"
                                name="author"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên tác giả!',
                                    },
                                ]}
                            >
                                <Input
                                    className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                                    placeholder="Vui lòng nhập tên tác giả"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item
                                label="Giá tiền"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập giá tiền!!',
                                    },
                                ]}
                            >
                                <InputNumber
                                    addonAfter={'VND'}
                                    formatter={(value) => {
                                        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                    }}
                                    placeholder="0"
                                    name="price"
                                    style={{
                                        width: '100%',
                                    }}
                                    min={0}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="category"
                                label="Thể loại"
                                rules={[
                                    {
                                    required: true,
                                    message: "Vui lòng nhập thể loại sách!",
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Chọn thể loại"
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input:any, option:any) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={handleSelectChange}
                                    value={category}
                                >
                                    {listCategory &&
                                        listCategory.map((item:any) => (
                                            <Select.Option key={item.id} value={item.id}>
                                                {item.nameCate}
                                            </Select.Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={7}>
                            <Form.Item
                                name={'quantity'}
                                label="Số lượng"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số lượng!',
                                    },
                                ]}
                            >
                                <InputNumber name={'quantity'} placeholder="0" min={0} className={'w-full'} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={24}>
                            <Form.Item
                                label="Mô tả"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả sách!',
                                    },
                                ]}
                            >
                                <ReactQuill
                                    placeholder="Vui lòng nhập mô tả sách"
                                    modules={modules}
                                    formats={formats}
                                    onChange={setDescription} // Thêm onChange để cập nhật giá trị mô tả
                                    value={description} // Sử dụng giá trị state cho nội dung mô tả
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <Divider />
                            Ảnh thumbnail
                            <Upload
                                listType="picture-card"
                                fileList={fileListThumbnail}
                                onPreview={handlePreview}
                                beforeUpload={() => false}
                                maxCount={1}
                                onChange={handleChangee}
                            >
                                {'+ Upload'}
                            </Upload>
                            <span className="text-gray-500">Chỉ được phép đăng 1 ảnh duy nhất.</span>
                        </Col>
                        <Col span={12}>
                            <Divider />
                            Ảnh slider
                            <Upload
                                listType="picture-card"
                                fileList={fileListSlider}
                                onPreview={handlePreview}
                                beforeUpload={() => false}
                                maxCount={5}
                                onChange={handleChange}
                            >
                                {'+ Upload'}
                            </Upload>
                            <span className="text-gray-500">Được phép đăng tối đa 5 ảnh.</span>
                        </Col>
                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Row>
                </Form>
            }
        </Modal>
    );
};
