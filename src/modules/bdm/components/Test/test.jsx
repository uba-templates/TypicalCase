import React, { Component } from "react";
import { Table, Select, Checkbox, Input, Icon, Tooltip, Animate, Button } from 'tinper-bee';
import InputRender from "tinper-bee/lib/InputRender.js";
import DateRender from "tinper-bee/lib/DateRender.js";

const format = "YYYY-MM-DD";
const format2 = "YYYY-MM";
const format3 = "YYYY-MM-DD HH:mm:ss";

const dateInputPlaceholder = "选择日期";
const dateInputPlaceholder2 = "选择年月";
const dataSource = [
  {
    key: "boyuzhou",
    value: "jack"
  },
  {
    key: "renhualiu",
    value: "lucy"
  },
  {
    key: "yuzhao",
    value: "yiminghe"
  }
];
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          key: "0",
          name: "沉鱼",
          number: "10",
          age: "y",
          address: "jack",
          datepicker: "2017-06-12",
          MonthPicker: "2017-02"
        },
        {
          key: "1",
          name: "落雁",
          number: "100",
          age: "y",
          address: "lucy",
          datepicker: "2017-06-12",
          MonthPicker: "2017-02"
        },
        {
          key: "2",
          name: "闭月",
          number: "1000",
          age: "n",
          address: "lucy",
          datepicker: "2017-06-12",
          MonthPicker: "2017-02"
        },
        {
          key: "3",
          name: "羞花",
          number: "9999",
          age: "y",
          address: "lucy",
          datepicker: "2017-06-12",
          MonthPicker: "2017-02"
        }
      ],
      count: 4
    };
    this.columns = [
      {
        title: "普通输入",
        dataIndex: "name",
        key: "name",
        width: "150px",
        render: (text, record, index) => (
          <InputRender
            // name="name"
            // placeholder="请输入姓名"
            value={text}
            isclickTrigger={true}
            check={this.check}
            onChange={(this.onInputChange(index, "name"))}
            isRequire={true}
            method="blur"
            errorMessage={
              <Tooltip overlay={"错误提示"}>
                <Icon type="uf-exc-c" className="" />
              </Tooltip>
            }
            reg={/^[0-9]+$/}
          />
        )
      },
      {
        title: "货币输入",
        dataIndex: "number",
        key: "number",
        width: "150px",
        render: (text, record, index) => (
          <InputRender
            format="Currency"
            name="name"
            placeholder="请输入姓名"
            value={text}
            isclickTrigger={true}
            check={this.check}
            onChange={this.onInputChange(index, "name")}
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
        title: "复选",
        dataIndex: "age",
        key: "age",
        width: "100px",
        render: (text, record, index) => (
          <Checkbox
            checked={record.age}
            onChange={this.onCheckChange(index, "age")}
          />
        )
      },
      {
        title: "年月日",
        dataIndex: "datepicker",
        key: "datepicker",
        width: "200px",
        render: (text, record, index) => {
          return (
            <DateRender
              value={text}
              isclickTrigger={true}
              format={format}
              onSelect={this.onDateSelect}
              onChange={this.onDateChange}
              placeholder={dateInputPlaceholder}
            />
          );
        }
      },
      {
        title: "年月",
        dataIndex: "MonthPicker",
        key: "MonthPicker",
        width: "200px",
        render: (text, record, index) => {
          return (
            <DateRender
              value={text}
              type="MonthPicker"
              isclickTrigger={true}
              format={format2}
              onSelect={this.onSelect}
              onChange={this.onChange}
              placeholder={dateInputPlaceholder2}
            />
          );
        }
      }
    ];
  }
  check = (flag, obj) => {
    console.log(flag);
    console.log(obj);
  };

  onInputChange = (index, key) => {
      console.log('index'+key);

    return value => {
        console.log(11)
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  };
  onCheckChange = (index, key) => {
    return value => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  };
  onSelectChange = (index, key) => {
    return value => {
      console.log(`selected ${value}`);
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  };
  onDateChange = d => {
    console.log(d);
  };
  onDateSelect = d => {
    console.log(d);
  };
  onDelete = index => {
    return () => {
      const dataSource = [...this.state.dataSource];
      dataSource.splice(index, 1);
      this.setState({ dataSource });
    };
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `凤姐 ${count}`,
      age: 32,
      address: "jack",
      datepicker: "2017-06-12",
      MonthPicker: "2017-02"
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1
    });
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
  getData = () => {
    console.log(this.state.dataSource);
  };
  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div>
        <Button
          className="editable-add-btn"
          type="ghost"
          onClick={this.handleAdd}
        >
          添加一行
        </Button>
        <Button
          style={{marginLeft:"5px"}}
          className="editable-add-btn"
          type="ghost"
          onClick={this.getData}
        >
          获取数据
        </Button>
        <Table
          data={dataSource}
          columns={columns}
          getBodyWrapper={this.getBodyWrapper}
        />
      </div>
    );
  }
}

export default Test;