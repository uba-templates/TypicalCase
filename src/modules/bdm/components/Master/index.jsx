import React, { Component } from 'react';
import { actions } from "mirrorx";
import { Table,ButtonGroup, Button, Col, Row, Icon ,Popconfirm,Checkbox } from 'tinper-bee';
import Add from '../Add';
import multiSelect from "tinper-bee/lib/multiSelect.js";
import sort from "tinper-bee/lib/sort.js";
import sum from "tinper-bee/lib/sum.js";
import Test from '../Test';
// 主表列字段
const masterCols = [
    {
      title: "督办编号",
      dataIndex: "code",
      key: "code",
      width: 200
    },
    {
      title: "督办名称",
      dataIndex: "name",
      key: "b",
      width: 200
    },
    {
      title: "督办来源",
      dataIndex: "ly_code",
      key: "c",
      width: 200,
      sumCol: true,
    },
    {
      title: "责任人",
      dataIndex: "zrr",
      key: "d",
      width: 200
    }
  ];
  
//   子表列字段
const childCols = [
    {
        title: "编号",
        dataIndex: "sub_code",
        key: "a",
        width: 200
    },
    {
        title: "名称",
        dataIndex: "sub_name",
        key: "b",
        width: 200
    },
    {
        title: "主办人",
        dataIndex: "zbr",
        key: "c",
        width: 200,
        sumCol: true,
    },
    {
        title: "子任务描述",
        dataIndex: "sub_ms",
        key: "d",
        width: 200
    }
];
  

/*   const masterData = [
    { code: "001", name: "督办名称", ly_code: 30, zrr: "杨过", key: "2" },
    { code: "002", name: "男", ly_code: 41, zrr: "郭靖", key: "1" },
    { code: "003", name: "男", ly_code: 25, zrr: "欧阳锋", key: "3" }
  ];
  const childData = {
    0:[
        { sub_code: "001001", sub_name: "名称1", sub_ms: "小龙女", d: "内行", key: "2" },
        { sub_code: "001002", sub_name: "男", sub_ms: "杨过", d: "内行", key: "4" },
        { sub_code: "001003", sub_name: "男", sub_ms: "令狐冲", d: "大侠", key: "1" },
        { sub_code: "001004", sub_name: "男", sub_ms: 25, d: "郭靖", key: "3" }
    ],
    1:[
        { sub_code: "002001", sub_name: "名称2", sub_ms: "小龙女", d: "内行", key: "2" },
        { sub_code: "002002", sub_name: "男", sub_ms: "杨过", d: "内行", key: "4" },
        { sub_code: "002003", sub_name: "男", sub_ms: "令狐冲", d: "大侠", key: "1" },
        { sub_code: "002004", sub_name: "男", sub_ms: 25, d: "郭靖", key: "3" }
    ],
    2:[
        { sub_code: "003001", sub_name: "名称3", sub_ms: "小龙女", d: "内行", key: "2" },
        { sub_code: "003002", sub_name: "男", sub_ms: "杨过", d: "内行", key: "4" },
        { sub_code: "003003", sub_name: "男", sub_ms: "令狐冲", d: "大侠", key: "1" },
        { sub_code: "003004", sub_name: "男", sub_ms: 25, d: "郭靖", key: "3" }
    ]
  } ; */

let ComplexTable = multiSelect(sum(sort(Table)));
class MasterTable  extends Component {
    /* 
        showIndex用于组件切换，为0表示加载列表
        为1、2分别表示新增、修改
     */
    constructor(props) {
        super(props);
        console.log('props',props);
    }
    getParSelectData = data => {
        // console.log(data);
    };
    getChildSelectData = data => {
        console.log(data);
    }
    addClick = ()=>{
        console.log("添加数据");
        actions.master.changePage({"showIndex":1});
    }
    editClick = ()=>{
        console.log("编辑数据");
    }
    delClick = ()=>{
        console.log("删除数据");
        // 根据pk请求后端删除，前端刷新
    }
    rowClick=(record, index, event)=>{
        console.log(record,index);
        actions.master.rowClick(index);
    }
    selectedRow=(record,index)=>{
        console.log("selectedRow",index);
    }
    render() {
        let multiObj = {
            type: "checkbox"
        };
        /**
         *  masterData主表数据
         *  childData子表数据
         */
        let {showIndex,masterData,childData,refData,childPageFlag,cardPageChildData,count,childActivePage} = this.props;
        console.log("showIndex",showIndex);
        switch(showIndex){
            case 0:
                return (
                    <div>
                        <ButtonGroup style={{ margin: 10 }}>
                            <Button colors="primary" onClick={this.addClick} >新增</Button>
                            <Button colors="primary" onClick={this.editClick} >修改</Button>
                            <Button colors="primary" onClick={this.delClick}>删除</Button>
                        </ButtonGroup>
                        <ComplexTable
                            columns={masterCols}
                            data={masterData}
                            multiSelect={multiObj}
                            getSelectedDataFunc={this.getParSelectData}
                            onRowClick={this.rowClick}
                            title={currentData => <div>标题: 我是主表</div>}
                        />  
                        <ComplexTable
                            columns={childCols}
                            data={childData}
                            multiSelect={multiObj}
                            getSelectedDataFunc={this.getChildSelectData}
                            title={currentData => <div>标题: 我是子表</div>}
                        />
                    </div>  
                );
            case 1:
                return (
                    <div>
                        <Add masterData={masterData} childData={childData} refData={refData} childPageFlag={childPageFlag}
                            cardPageChildData={cardPageChildData} count={count} childActivePage={childActivePage} />
                    </div>
                );
            case 2:
                return (
                    <div>修改</div>
                );
        } 
    }
}

export default MasterTable ;
