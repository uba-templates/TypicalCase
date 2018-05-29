import React, { Component } from 'react';
import { Table, Select, Checkbox, Input, Icon, Tooltip, Animate, Button ,Popconfirm,Pagination } from 'tinper-bee';
import InputRender from "tinper-bee/lib/InputRender.js";
import DateRender from "tinper-bee/lib/DateRender.js";
import zhCN from "rc-calendar/lib/locale/zh_CN";
import {actions} from "mirrorx";
import "bee-datepicker/build/DatePicker.css";
import './index.less'

const Option = Select.Option;
const format = "YYYY-MM-DD";
const format2 = "YYYY-MM";
const format3 = "YYYY-MM-DD HH:mm:ss";
const dateInputPlaceholder = "选择日期";
const dateInputPlaceholder2 = "选择年月";

class ChildTable extends Component {
    
    constructor(props){
      super(props);
      this.columns = [ 
        { 
          title: "编号",
          dataIndex: "sub_code",
          key: "sub_code",
          width: "100px",
          render: (text, record, index) => (
            <InputRender
              name="sub_code"
              placeholder=""
              value={text}
              check={this.check}
              onChange={this.onInputChange(index, "sub_code")}
              method="blur"
              isRequire={true}
              errorMessage={
                <Tooltip overlay={"错误提示"}>
                  <Icon type="uf-exc-c" className="" />
                </Tooltip>
              }
            />
          )
        },
        {
          title: "名称",
          dataIndex: "sub_name",
          key: "sub_name",
          width: "100px",
          render: (text, record, index) => (
            <InputRender
              name="sub_name"
              placeholder=""
              value={text}
              onChange={this.onInputChange(index, "sub_name")}
              method="blur"
              errorMessage={
                <Tooltip overlay={"错误提示"}>
                  <Icon type="uf-exc-c" className="" />
                </Tooltip>
              }
            />
          )
        },
        { 
          title:"主办人",
          dataIndex: "zbr",
          key: "zbr",
          width: "150px",
          render: (text, record, index) => (
            <InputRender
              name="zbr"
              placeholder=""
              value={text}
              onChange={this.onInputChange(index, "zbr")}
              isRequire={true}
              method="blur"
              errorMessage={
                <Tooltip overlay={"错误提示"}>
                  <Icon type="uf-exc-c" className="" />
                </Tooltip>
              }
            />
          )
        }, 
        { 
          title:"子任务描述",
          dataIndex: "sub_ms",
          key: "sub_ms",
          width: "150px",
          render: (text, record, index) => (
            <InputRender
              name="sub_ms"
              placeholder=""
              value={text}
              onChange={this.onInputChange(index, "sub_ms")}
              errorMessage={
                <Tooltip overlay={"错误提示"}>
                  <Icon type="uf-exc-c" className="" />
                </Tooltip>
              }
            />
          )
        },
        {
          title:"开始日期",
          dataIndex: "begin_date",
          key: "begin_date",
          width: "200px",
          render: (text, record, index) => {
            return (
              <DateRender
                format={format}
                isclickTrigger={true}
                value={text}
                onChange={this.onDateChange}
              >
              </DateRender>
            );
          }
        },
        {
          title:"结束日期",
          dataIndex: "end_date",
          key: "end_date",
          width: "200px",
          render: (text, record, index) => {
            return (
              <DateRender
                locale={zhCN}
                format={format}
                isclickTrigger={true}
                value={text}
                onChange={this.onDateChange}
              >
              </DateRender>
            );
          }
        },
        {
          title: "操作",
          dataIndex: "operation",
          key: "operation",
          render: (text, record, index) => {
            return props.cardPageChildData.length > 0 ? (
              <Popconfirm content="确认删除?" id="aa" onClose={this.onDelete(index,props.cardPageChildData)}>
                <Icon type="uf-del" />
              </Popconfirm>
            ) : null;
          }
        }
      ];
    }

    onDelete=(index,data)=>()=>{
      console.log("data",data);
      data.splice(index,1);
      actions.master.deleteEmptyRow({cardPageChildData:data});
    }

    onInputChange=(index,key)=>{
      // console.log("index",index,'key',key)
      return (value)=>{
        
        let {cardPageChildData} = this.props;
        cardPageChildData[index][key] = value;
        actions.master.changeCardList(cardPageChildData);
      }
    }

    onDateChange=(date)=>{
      console.log("date",date);
    }
    handleAdd=()=>{
      let {cardPageChildData,count} = this.props;

      let newData = {
        key:count,
        sub_code:`新数据${count}`,
        sub_name:"",
        zbr:"",
        sub_ms:"",
        begin_date:"",
        end_date:"",
        operation:""
      }
      count++;
      cardPageChildData.push(newData);

      let tempState = {
        // cardPageChildData:[...cardPageChildData,newData],
        cardPageChildData:cardPageChildData,
        count:count
      }
      console.log(tempState);
      actions.master.addEmptyRow(tempState);
    }
    check = (flag, obj) => {
      console.log(flag);
      console.log(obj);
    };
    getBodyWrapper = body => {
      return (
        <Animate
          transitionName="move"
          component="tbody"
          className={body.props.className}
        >
          {body.props.children}
        </Animate>
      );
    };
    handleSelect=(eventKey)=>{
      actions.master.changeChildPagination({childActivePage:eventKey});
    }

    handlePagination=(value)=>{
      // 根据选中的数目，每页显示相应的数目
    }

    render() {
      let { cardPageChildData,childActivePage } = this.props;
      const columns = this.columns;
      return (
          <div>

              <div className="childContent">
                  <Button size="sm" colors="primary" onClick={this.handleAdd} className="childadd">增行</Button>
              </div>
              <div >
                <Table
                  data={cardPageChildData}
                  columns={columns}
                  getBodyWrapper={this.getBodyWrapper}
                  className="childTable"
                />
                <div className="pagination_ajust">
                  <Pagination
                    first
                    last
                    prev
                    next
                    boundaryLinks
                    items={cardPageChildData.length/10+1}
                    maxButtons={5}
                    activePage={childActivePage}
                    onSelect={this.handleSelect} 
                    className="childPagination"
                  />
                  <div className="totality">共 {cardPageChildData.length} 条</div>
                  <div >显示
                    <Select
                      style={{ width: 50, marginRight: 6 }}
                      onChange={this.handlePagination}
                    >
                      <Option value="5">5</Option>
                      <Option selected value="10">10</Option>
                      <Option value="20">20</Option>
                      <Option value="100">100</Option>
                    </Select>
                  </div>
                </div>
                
              </div>
              
          </div>
      );
    }
}

export default ChildTable;