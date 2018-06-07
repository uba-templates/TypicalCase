
import React, { Component } from 'react';
import { Table, Checkbox,Button,Popconfirm,Icon } from 'tinper-bee';
import {actions,routing} from 'mirrorx';
import EnhancedPagination from '../EnhancedPagination'
import './index.less'

const defaultPropsSelf = {
    prefixCls: "bee-table",
    multiSelect: {
      type: "checkbox",
      param: "key"
    }
}

const masterCols = [
    {
        title: "工单编码",
        dataIndex: "code",
        key: "code",
        width: 150
    },
    {
        title: "工单名称",
        dataIndex: "name",
        key: "name",
        width: 150
    },
    {
        title: "工单类型",
        dataIndex: "type",
        key: "type",
        width: 150,
    },
    {
        title: "申请人",
        dataIndex: "applicant",
        key: "applicant",
        width: 150,
    },
    {
        title: "申请时间",
        dataIndex: "applyTime",
        key: "applyTime",
        width: 150,
    },
    {
        title: "最后修改时间",
        dataIndex: "lastModifyUser",
        key: "lastModifyUser",
        width: 150,
    }
];

let isInitChecked = true;


class TableWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedAll: false,
            checkedArray: [],
            commitFlag:0
        };
    }
    
    componentWillReceiveProps = (nextProps)=>{
        let data = nextProps.data;
        let length = data ? data.length : 20;
        let checkedArray = []
        for (var i = 0; i < length; i++) {
            checkedArray.push(false);
        }
        this.setState({checkedArray:checkedArray});
        // actions.master.save({ checkedArray });
        
    }
    onAllCheckChange = () => {
        let self = this;
        let checkedArray = [];
        let listData = this.props.data.concat();
        let selIds = [];
        // let id = self.props.multiSelect.param;
        for (var i = 0; i < self.state.checkedArray.length; i++) {
            checkedArray[i] = !self.state.checkedAll;
        }
        self.setState({
            checkedAll: !self.state.checkedAll,
            checkedArray: checkedArray,
            // selIds: selIds
        });
        // self.props.onSelIds(selIds);
    };
    onCheckboxChange = (text, record, index) => {
        let self = this;
        let allFlag = false;
        // let selIds = self.state.selIds;
        // let id = self.props.postId;
        let checkedArray = self.state.checkedArray.concat();
        // if (self.state.checkedArray[index]) {
        // selIds.remove(record[id]);
        // } else {
        // selIds.push(record[id]);
        // }
        checkedArray[index] = !self.state.checkedArray[index];
        for (var i = 0; i < self.state.checkedArray.length; i++) {
            if (!checkedArray[i]) {
                allFlag = false;
                break;
            } else {
                allFlag = true;
            }
        }
        self.setState({
            checkedAll: allFlag,
            checkedArray: checkedArray,
        });
    };

    // 编辑修改
    onEdit=(text, record, index)=>{
        
        return ()=>{
            console.log("点击修改",record,index);
            let tempState = {
                "btnFlag":1,
                "rowData":record,
                "showIndex":1
            }
            actions.master.save(tempState);
        }
    }

    // 行删除
    onRowDel=(text, record, index)=>{
        return ()=>{
            console.log("点击删除",record,index);
            actions.master.remove([{"id":record["id"]}]);
        }
        
    }

    renderColumnsMultiSelect(columns) {
        const { checkedArray } = this.state;
        const { multiSelect } = this.props;
        let select_column = {};
        let indeterminate_bool = false;
        // let indeterminate_bool1 = true;
        if (multiSelect && multiSelect.type === "checkbox") {
            let i = checkedArray.length;
            while (i--) {
                if (checkedArray[i]) {
                    indeterminate_bool = true;
                    break;
                }
            }
            let defaultColumns = [
                {
                    title: (
                        <Checkbox
                            className="table-checkbox"
                            checked={this.state.checkedAll}
                            indeterminate={indeterminate_bool && !this.state.checkedAll}
                            onChange={this.onAllCheckChange}
                        />
                    ),
                    key: "checkbox",
                    dataIndex: "checkbox",
                    width: "5%",
                    render: (text, record, index) => {
                        return (
                            <Checkbox
                                className="table-checkbox"
                                checked={this.state.checkedArray[index]}
                                onChange={this.onCheckboxChange.bind(this, text, record, index)}
                            />
                        );
                    }
                }
            ];
            const operateCols = [
                {
                    title: "操作",
                    dataIndex: "operate",
                    key: "operate",
                    render:(text, record, index)=> {
                        return (
                            <div>
                                <span className="bcolor" onClick={this.onEdit(text, record, index)}>修改</span>
                                <span className="span-adjust" onClick={this.onRowDel(text, record, index)} >删除</span>
                            </div>
                        );
                    }
                }
            ]
            columns = defaultColumns.concat(columns).concat(operateCols);
        }
        return columns;
    }

    // 添加数据
    onAdd = () => {
        console.log("添加数据");
        let tempState = {
            "showIndex": 1 ,
            "btnFlag":0,
            "rowData":{}
        }
        actions.master.changePage(tempState);
        /* actions.routing.push({
            pathname:'/bdm/card',

        }) */
    }

    // 查看方法
    onCheck = ()=>{
        let {checkedArray} = this.state;
        let rowData,data=this.props.data;
        // 查看时检查是否已选中数据
        let checkedFlag = false;
        for(var i=0;i<checkedArray.length;i++){
            if(checkedArray[i]){
                checkedFlag = true;
                rowData = data[i];
                break;
            }
        }

        if(!checkedFlag){
            alert("请选择查看的数据");
            return;
        }else {
            let tempState = {
                "showIndex":1,
                "btnFlag":2,
                "rowData":rowData
            }
            actions.master.save(tempState)
            /* actions.routing.push({
                pathname:'/bdm/card',
            }) */
        }
        
    }

    // 提交方法
    onCommit = async ()=>{
        
        let { checkedArray } = this.state;
        let data = this.props.data;
        console.log("data", data);
        let length = (data.length < checkedArray.length) ? data.length : checkedArray.length;
        let submitArray = [];
        for (var i = 0; i < checkedArray.length; i++) {
            if (checkedArray[i]) {
                if(data[i]["status"]==0){
                    submitArray.push({ "id": data[i]["id"] });
                }else {
                    alert(`单据${data[i]["code"]}不能重复提交`);
                }
                
                // submitArray.push(data[i]);
            }
        }
        console.log("submitArray", submitArray);

        if (submitArray.length > 0) {
            let tempState = {
                "funccode": "react",
                "nodekey": "003",
                "submitArray": submitArray
            }
            let {pomFlag,message} = await actions.master.onCommit(tempState);
            if(pomFlag){
                alert("单据提交操作成功");
                actions.master.load();
            }else {
                alert(message);
            }
        } else {
            // 弹出提示请选择数据
            alert("请重新选择提交数据");
        }
        

        
    }

    // 撤回
    onRecall = async ()=>{
        let {checkedArray} = this.state;
        let data = this.props.data;
        console.log("data",data);
        let length = (data.length<checkedArray.length)?data.length:checkedArray.length;
        let recallArray = [];
        for(var i=0;i<checkedArray.length;i++){
            if(checkedArray[i]){
                if(data[i]["status"]==1){
                    recallArray.push({"id":data[i]["id"]});
                }else {
                    alert(`单据${data[i]["code"]}未提交,不能执行撤回操作`);
                } 
            }
        }
        console.log("撤回",recallArray);
        if(recallArray.length>0){
            let {pomFlag,message} = await actions.master.onRecall(recallArray);
            if(pomFlag){
                alert('单据撤回操作成功');
                actions.master.load();
            }else {
                alert(message);
            }
        }else {
            // 弹出提示请选择数据
            alert("请选择撤回");
        }
    }

    // 多行删除
    onMultiDel=()=>{
        let {checkedArray} = this.state;
        let data = this.props.data;
        console.log("data",data);
        let length = (data.length<checkedArray.length)?data.length:checkedArray.length;
        let delArray = [];
        for(var i=0;i<checkedArray.length;i++){
            if(checkedArray[i]){
                delArray.push({"id":data[i][id]});
            }
        }
        console.log("delArray",delArray);
        if(delArray.length>0){
            actions.master.remove(delArray);
        }else {
            // 弹出提示请选择数据
        }
        
    }

    render() {
        let columns = this.renderColumnsMultiSelect(masterCols);
        let {data,checkedArray} = this.props;
        return (
            <div>
                <div style={{ margin:" 6px 15px 0 15px" }}>
                    <Button className="editable-add-btn" size="sm" colors="primary" onClick={this.onAdd} style={{ marginLeft: "5px" }} >新增</Button>
                    <Button className="editable-add-btn" size="sm" colors="primary" onClick={this.onCheck} style={{ marginLeft: "5px" }} >查看</Button>
                    <Button className="editable-add-btn" size="sm" colors="primary" onClick={this.onCommit} style={{ marginLeft: "5px" }}>提交</Button>
                    <Button className="editable-add-btn" size="sm" colors="primary" onClick={this.onRecall} style={{ marginLeft: "5px" }}>撤回</Button>
                    <Button className="editable-add-btn" size="sm" colors="primary" onClick={this.onMultiDel} style={{ marginLeft: "5px" }}>删除</Button>
                </div>
                <Table 
                    columns={columns} 
                    data={data} 
                    rowKey={(record)=>record.id}
                />
                
            </div>
        )
        
    }

    
}

TableWrapper.defaultProps = defaultPropsSelf;

export default TableWrapper;