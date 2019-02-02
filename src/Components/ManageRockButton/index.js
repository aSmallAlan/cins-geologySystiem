import React from 'react'
import {  Modal, Form, Input, Icon, Select, Upload, Cascader, message} from 'antd';
import {fetchUpdateRocks} from "../../Fetch/fetchSearchData";
import {connect} from "react-redux";


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
            let imageSrc = this.props.message.detail.image;
            this.setState({
                fileList:[{
                    uid: '-1',
                    name: 'xxx.png',
                    status: 'done',
                    url: imageSrc,
                }]
            });
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
                allData = this.props.message;
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
            const {poltypes, regions, lithos} = this.props;
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
                        <FormItem
                            label="图片"
                        >
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
                        {/*颜色*/}
                        <FormItem
                            label="颜色"
                        >
                            {getFieldDecorator('color',{ initialValue: allData.detail.color},{
                                rules: [{ required: true, message: '请输入颜色!' }],
                            })(
                                <Input prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入颜色" />
                            )}
                        </FormItem>
                        {/*倍数*/}
                        <FormItem
                            label="倍数"
                        >
                            {getFieldDecorator('multiple',{ initialValue: allData.detail.multiple},{
                                rules: [{ required: true, message: '请输入倍数!' }],
                            })(
                                <Input prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入倍数" />
                            )}
                        </FormItem>
                        {/*年代地层单位*/}
                        <FormItem
                            label="年代地层单位"
                        >
                            {getFieldDecorator('area_detail',{ initialValue: allData.detail.area_detail},{
                                rules: [{ required: true, message: '请选择年代地层单位!' }],
                            })(
                                <Cascader
                                    options={regions}
                                    placeholder="请选择年代地层单位"
                                    displayRender={displayRender}
                                    fieldNames={{
                                        label: 'region',
                                        value: 'id',
                                        children: 'next_categery'
                                    }}
                                />,
                            )}
                        </FormItem>
                        {/*深度*/}
                        <FormItem
                            label="深度"
                        >
                            {getFieldDecorator('depth',{ initialValue: allData.depth},{
                                rules: [{ required: true, message: '请输入深度!' }],
                            })(
                                <Input prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入深度" />
                            )}
                        </FormItem>
                        {/*偏光类型*/}
                        <FormItem
                            label="偏光类型"
                        >
                            {getFieldDecorator('pol_type',{ initialValue: allData.detail.pol_type},{
                                rules: [{ required: true, message: '请选择偏光类型！' }],
                            })(
                                <Select
                                    placeholder="选择偏光类型"
                                >
                                    {
                                        poltypes.map((item, index)=>{
                                            return <Option value={item.id}>{item.pol_type}</Option>
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                        {/*岩性*/}
                        <FormItem
                            label="岩性"
                        >
                            {getFieldDecorator('lit_des',{ initialValue: allData.detail.lit_des},{
                                rules: [{ required: true, message: '请选择岩性！' }],
                            })(
                                <Select
                                    placeholder="选择岩性"
                                >
                                    {
                                        lithos.map((item, index)=>{
                                            return <Option value={item.id}>{item.lit_des}</Option>
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                        {/*组分特征*/}
                        <FormItem
                            label="组分特征"
                        >
                            {getFieldDecorator('lit_com',{ initialValue: allData.detail.lit_com})(
                                <TextArea prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入组分特征" />
                            )}
                        </FormItem>
                        {/*岩性特征*/}
                        <FormItem
                            label="岩性特征"
                        >
                            {getFieldDecorator('lit_fea',{ initialValue: allData.detail.lit_fea})(
                                <TextArea prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入岩性特征" />
                            )}
                        </FormItem>
                        {/*古生物特征*/}
                        <FormItem
                            label="古生物特征"
                        >
                            {getFieldDecorator('pal_fea',{ initialValue: allData.detail.pal_fea})(
                                <TextArea prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入古生物特征" />
                            )}
                        </FormItem>
                        {/*孔缝特征*/}
                        <FormItem
                            label="孔缝特征"
                        >
                            {getFieldDecorator('por_fea',{ initialValue: allData.detail.por_fea})(
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

    //上传修改
    handleCreate(){
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let fileList = this.state.imgData;
            let postData =  Object.assign(values,{ image: fileList, area_detail: values.area_detail[values.area_detail.length -1]})

            let result = fetchUpdateRocks({id: this.props.message.detail.id},postData);
            result.then(res=>{
                return  res.json()
            }).then(res=>{
                    if (res.code == 0){
                        message.info("修改成功！");
                        this.props.update(this.props.currentPage);
                        this.setState({ visible: false });
                    }else{
                        message.error(res.msg)
                    }
                }
            );
            form.resetFields();
        });
    };

    saveFormRef(formRef){
        this.formRef = formRef;
    };

    render() {
        const {poltypes, regions, lithos} = this.props;
        return (
                <a  onClick={this.showModal}>修改
                    {
                        this.state.visible?
                            <CollectionCreateForm
                                wrappedComponentRef={this.saveFormRef}
                                visible={this.state.visible}
                                poltypes={poltypes.polData}
                                regions={regions.regionData}
                                lithos={lithos.litData}
                                onCancel={this.handleCancel}
                                onCreate={this.handleCreate}
                                getImgData={this.getImgData}
                                message={this.props.message}
                            />:null
                    }
                </a>
        );
    }
}
// 链接redux
function mapStateToProps(state) {
    return {
        poltypes: state.poltypeData,
        regions: state.regionData,
        lithos: state.lithosData
    }
}
export default connect(
    mapStateToProps
)(CollectionsPage)
