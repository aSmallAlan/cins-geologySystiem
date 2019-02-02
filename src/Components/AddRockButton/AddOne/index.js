import React from 'react'
import {Icon,  Upload, Cascader, Modal, message, Form, Input, Select, Button} from 'antd'
import {fetchAddRocks} from "../../../Fetch/fetchSearchData";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as chooseMessageActionsFromOtherFile from "../../../Actions/chooseMessage";

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
class AddOne extends React.Component{
    constructor(props){
        super(props);
        this.beforeUploadHandle = this.beforeUploadHandle.bind(this);
        this.fileRemove = this.fileRemove.bind(this)
        this.handleCancel  = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.normFile = this.normFile.bind(this);
        this.submitAddOne = this.submitAddOne.bind(this);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
            fileData: []
        };
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
        let imgData = [];
        imgData.push(file);
        this.setState({
            fileData: imgData
        });
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

    //提交添加信息
    submitAddOne(e){
        e.preventDefault();
        let fileList = this.state.fileData;
        if (fileList.length === 0){
            this.props.form.setFields({
                upload: {
                    errors: [new Error('请上传图片！')],
                },
            });
        }else{
            this.props.form.resetFields("upload");
        }
        this.props.form.validateFields((err, values) => {
            if (!err && fileList.length !==0) {
                console.log(values)
                let postData = Object.assign(values,{ image: fileList, area_detail: values.area_detail[values.area_detail.length -1]});
                let result = fetchAddRocks(postData);
                result.then(res=>{
                    return  res.json()
                }).then(res=>{
                        if (res.code === 0){
                            message.info("添加成功!");
                            //将数据重置
                            this.props.form.resetFields();
                            this.setState({
                                fileList: []
                            });
                            //刷新数据
                            this.props.update(this.props.currentPage)
                        }else{
                            message.error(res.msg)
                        }
                    }
                );
            }
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        let poltypes = [];
        let regions = [];
        let lithos = [];
        try{
            poltypes = this.props.poltypes;
            regions = this.props.regions;
            lithos = this.props.lithos;
            if (JSON.stringify(poltypes) === '{}' || JSON.stringify(regions) === '{}' || JSON.stringify(lithos) === '{}'){
                poltypes = [];
                regions = [];
                lithos = [];
            } else{
                regions = regions.regionData;
                poltypes = poltypes.polData;
                lithos = lithos.litData;
            }
        }catch (e) {

        }
        return(
            <Form layout="vertical" onSubmit={this.submitAddOne}>
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
                    {getFieldDecorator('color')(
                        <Input prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入颜色" />
                    )}
                </FormItem>
                {/*倍数*/}
                <FormItem
                    label="倍数"
                >
                    {getFieldDecorator('multiple')(
                        <Input prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入倍数" />
                    )}
                </FormItem>
                {/*年代地层单位*/}
                <FormItem
                    label="年代地层单位"
                >
                    {getFieldDecorator('area_detail',{
                        rules: [{ required: true, message: '请选择年代地层单位!' }],
                    })(
                        <Cascader
                            options={regions}
                            width="400"
                            placeholder="请选择年代地层单位"
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
                    {getFieldDecorator('depth',{
                        rules: [{ required: true, message: '请输入深度!' }],
                    })(
                        <Input prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入深度" />
                    )}
                </FormItem>
                {/*偏光类型*/}
                <FormItem
                    label="偏光类型"
                >
                    {getFieldDecorator('pol_type',{
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
                    {getFieldDecorator('lit_des',{
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
                    {getFieldDecorator('lit_com')(
                        <TextArea prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入组分特征" />
                    )}
                </FormItem>
                {/*岩性特征*/}
                <FormItem
                    label="岩性特征"
                >
                    {getFieldDecorator('lit_fea')(
                        <TextArea prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入岩性特征" />
                    )}
                </FormItem>
                {/*古生物特征*/}
                <FormItem
                    label="古生物特征"
                >
                    {getFieldDecorator('pal_fea')(
                        <TextArea prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入古生物特征" />
                    )}
                </FormItem>
                {/*孔缝特征*/}
                <FormItem
                    label="孔缝特征"
                >
                    {getFieldDecorator('por_fea')(
                        <TextArea prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入孔缝特征" />
                    )}
                </FormItem>
                {/*确认提交*/}
                <FormItem>
                    <Button style={{width: '100%'}} type="primary" htmlType="submit" className="login-form-button">确认</Button>
                </FormItem>
            </Form>
        )
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
function mapDispatchToProps(dispatch) {
    return {
        chooseMessageDataAction: bindActionCreators(chooseMessageActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create()(AddOne))
