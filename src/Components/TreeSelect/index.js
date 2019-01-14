import React from 'react'
import { TreeSelect } from 'antd';

const SHOW_PARENT = TreeSelect.SHOW_PARENT;

class TreeSelectSearch extends React.Component {

    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            value: [],
            regionValue: [],
            polType: [],
            litDes: []
        }
    }

    //获取选择的数据
    onChange(value){
        let regionValue = [];
        let polType = [];
        let litDes = [];
        value.map((item) => {
            let checkStr = item.substr(0,3);
            if (checkStr == 'reg'){
                regionValue.push(item.substr(6))
            } else if(checkStr == 'pol'){
                polType.push(item.substr(3))
            }else if (checkStr == 'lit'){
                litDes.push(item.substr(4))
            }
        });
        this.setState({value});
        this.props.getSearchData(regionValue, polType, litDes)
    };

    render() {
        const treeData = this.props.treeData;
        const tProps = {
            treeData,
            value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            multiple: true,
            searchPlaceholder: '请点击选择',
            style: {
                width: 300,
            },
        };
        return <TreeSelect {...tProps} />;
    }
}

export default TreeSelectSearch;
