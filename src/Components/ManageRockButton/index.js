import React from 'react'
import { Button, Modal, Form, Input, Icon, Select, message, Upload, Cascader} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const CollectionCreateForm = Form.create()(
    class extends React.Component {
        constructor(props){
            super(props);
            this.beforeUploadHandle = this.beforeUploadHandle.bind(this);
            this.fileRemove = this.fileRemove.bind(this)
            this.handleCancel  = this.handleCancel.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.handlePreview = this.handlePreview.bind(this);
            this.normFile = this.normFile.bind(this);
            this.state = {
                previewVisible: false,
                previewImage: '',
                fileList: [],
                fileData: []
            }
        }

        componentDidMount(){
            let imageSrc = this.props.allData.image;
           this.setState({
               fileList:[{
                   uid: '-1',
                   name: 'xxx.png',
                   status: 'done',
                   url: imageSrc,
               }]
           })
        }

        //----------上传图片-----------------
        handleCancel(){this.setState({ previewVisible: false })};

        handlePreview(file){
            this.setState({
                previewImage: file.url || file.thumbUrl,
                previewVisible: true,
            });
        };

        handleChange({ fileList }){this.setState({ fileList })};


        // 拦截文件上传
        beforeUploadHandle(file){
            this.setState(({fileData})=>({
                fileData:[...fileData,file],
            }));
            let imgData = [];
            imgData.push(file);
            this.props.getImgData(imgData);
            return false;
        };

        // 文件列表的删除
        fileRemove(){
            this.setState({
                fileData: []
            })
        };
        //-------------------------------------


        //----------------其他表单元素----------------------
        //数字验证

        //-------------------------------------------

        normFile(e){
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        };

        render() {
            let allData = [];
            try{
                allData = this.props.allData;
            }catch (e) {
                return e
            }

            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            const { previewVisible, previewImage, fileList } = this.state;
            const uploadButton = (
                <div>
                    <Icon type="plus" />
                    <div className="ant-upload-text">Upload</div>
                </div>
            );


            const options = this.props.regionList;
            //只显示最后一层
            function displayRender(label) {
                return label[label.length - 1];
            }

            return (
                <Modal
                    visible={visible}
                    title="修改薄片信息"
                    okText="确认"
                    cancelText="取消"
                    destroyOnClose={true}
                    maskClosable={false}
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        {/*图片*/}
                        <FormItem>
                            {getFieldDecorator('upload',{
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                            })(
                                <div className="clearfix">
                                    <Upload
                                        action="路径"
                                        listType="picture-card"
                                        fileList={fileList}
                                        beforeUpload={this.beforeUploadHandle}
                                        onRemove={this.fileRemove}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}
                                    >
                                        {fileList.length >= 1 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                            )}
                        </FormItem>
                        {/*深度*/}
                        <FormItem>
                            {getFieldDecorator('depth', { initialValue: allData.depth},{
                                rules: [{ required: true, message: '请输入深度!' }],
                            })(
                                <Input prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入深度" />
                            )}
                        </FormItem>
                        {/*偏光类型*/}
                        <FormItem>
                            {getFieldDecorator('pol_type', { initialValue: allData.pol_type.id},{
                                rules: [{ required: true, message: '请选择偏光类型！' }],
                            })(
                                <Select
                                    placeholder="选择偏光类型"
                                >

                                </Select>
                            )}
                        </FormItem>
                        {/*岩性*/}
                        <FormItem>
                            {getFieldDecorator('lit_des', { initialValue: allData.lit_des.id},{
                                rules: [{ required: true, message: '请选择岩性！' }],
                            })(
                                <Select
                                    placeholder="选择岩性"
                                >
                                </Select>
                            )}
                        </FormItem>
                        {/*组分特征*/}
                        <FormItem>
                            {getFieldDecorator('lit_com',{ initialValue: allData.lit_com})(
                                <TextArea prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入组分特征" />
                            )}
                        </FormItem>
                        {/*古生物特征*/}
                        <FormItem>
                            {getFieldDecorator('pal_fea', { initialValue: allData.pal_fea})(
                                <TextArea prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入古生物特征" />
                            )}
                        </FormItem>
                        {/*岩性特征*/}
                        <FormItem>
                            {getFieldDecorator('lit_fea',  { initialValue: allData.lit_fea})(
                                <TextArea prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入岩性特征" />
                            )}
                        </FormItem>
                        {/*孔缝特征*/}
                        <FormItem>
                            {getFieldDecorator('por_fea',  { initialValue: allData.por_fea})(
                                <TextArea prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入孔缝特征" />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);

class CollectionsPage extends React.Component {
    constructor(props){
        super(props);
        this.showModal = this.showModal.bind(this);
        this.saveFormRef = this.saveFormRef.bind(this);
        this.getImgData = this.getImgData.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.state = {
            visible: false,
            imgData: [],
            allMessage: null
        }
    }

    getImgData(data){
        this.setState({
            imgData: data
        })
    };

    showModal(){

            this.setState({
                visible: true
            })
    };

    handleCancel(){
        this.setState({ visible: false });
    };

    //提交
    handleCreate(){
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            form.resetFields();
        });
    };

    saveFormRef(formRef){
        this.formRef = formRef;
    };

    render() {
        return (
                <a  onClick={this.showModal}>修改
                    {
                        this.state.visible?
                            <CollectionCreateForm
                                wrappedComponentRef={this.saveFormRef}
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                                onCreate={this.handleCreate}
                                getImgData={this.getImgData}
                                regionList={this.props.regionList}
                                poltypeList={this.props.poltypeList}
                                lithosList={this.props.lithosList}
                                allData={this.state.allMessage}
                            />:null
                    }
                </a>

        );
    }
}
export default CollectionsPage
