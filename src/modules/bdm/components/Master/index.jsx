import React, { Component } from 'react';
import { actions } from "mirrorx";
import { Table, Button, Col, Row, Icon ,Popconfirm,Checkbox } from 'tinper-bee';
import multiSelect from "tinper-bee/lib/multiSelect.js";
import sort from "tinper-bee/lib/sort.js";
import sum from "tinper-bee/lib/sum.js";
const columns13 = [
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
  
  const columns13_1 = [
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
  

  const data13 = [
    { code: "001", name: "督办名称", ly_code: 30, zrr: "杨过", key: "2" },
    { code: "002", name: "男", ly_code: 41, zrr: "郭靖", key: "1" },
    { code: "003", name: "男", ly_code: 25, zrr: "欧阳锋", key: "3" }
  ];
  const data13_1 = {
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
  } ;

let ComplexTable = multiSelect(sum(sort(Table)));
class MasterTable  extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data13: data13,
            data13_1:[],
            selectedRow: this.selectedRow,
            selectDisabled: this.selectDisabled
        };
    }
    getParSelectData = data => {
        // console.log(data);
    };
    getChildSelectData = data => {
        console.log(data);
    }
    addClick = ()=>{
        console.log("添加数据");
    }
    editClick = ()=>{
        console.log("编辑数据");
    }
    delClick = ()=>{
        console.log("删除数据");
        let {data13} = this.state;
        for(var i=0;i<data13.length;i++){

        }
    }
    rowClick=(record, index, event)=>{
        console.log(record,index);
        this.setState({
            data13_1:data13_1[index]
        })
    }
    selectedRow=(record,index)=>{
        console.log("selectedRow",index);
    }
    render() {
        let multiObj = {
            type: "checkbox"
        };
        return (
            <div>
                <Button className="editable-add-btn" onClick={this.addClick}>
                    新增
                </Button>
                <Button
                    className="editable-add-btn"
                    style={{ marginLeft: "5px" }}
                    onClick={this.editClick}
                >
                    编辑
                </Button>
                <Button
                    className="editable-add-btn"
                    style={{ marginLeft: "5px" }}
                    onClick={this.delClick}

                >
                    删除
                </Button>
                <ComplexTable
                    selectDisabled={this.state.selectDisabled}
                    columns={columns13}
                    data={this.state.data13}
                    multiSelect={multiObj}
                    getSelectedDataFunc={this.getParSelectData}
                    onRowClick={this.rowClick}
                    title={currentData => <div>标题: 我是主表</div>}
                />
                <ComplexTable
                    columns={columns13_1}
                    data={this.state.data13_1}
                    multiSelect={multiObj}
                    getSelectedDataFunc={this.getChildSelectData}
                    title={currentData => <div>标题: 我是子表</div>}
                />
            </div>  
        );
    }
}

export default MasterTable ;
