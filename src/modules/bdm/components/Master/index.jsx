import React, { Component } from 'react';
import { actions } from "mirrorx";
import { Table,FormControl, ButtonGroup, Button, Col, Row, Icon, Popconfirm, Checkbox,FormGroup,Radio} from 'tinper-bee';
import SearchPanel from 'bee-search-panel';
import Add from '../Add';
import Card from '../Card';
import TableWrapper from '../TableWrapper';
import PaginationWrapper from '../Pagination'
import multiSelect from "tinper-bee/lib/multiSelect.js";
import sort from "tinper-bee/lib/sort.js";
import sum from "tinper-bee/lib/sum.js";
import "./index.less"
// 主表列字段
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
    },
    {
        title: "操作",
        dataIndex: "operate",
        key: "operate",
        render(text, record, index) {
            return (
                <a
                    href="#"
                    tooltip={text}
                    onClick={() => {
                        alert('这是第' + index + '列，内容为:' + text);
                    }}
                >
                    一些操作
                    </a>
            );
        }
    }
];

let ComplexTable = multiSelect(sum(sort(Table)));
class MasterTable extends Component {
    /*      
        showIndex用于组件切换，为0表示加载列表
        为1、2分别表示新增、修改
     */
    constructor(props) {
        super(props);
        this.state = {
            code:"",
            name:""
        }
    }

    rowClick = (record, index, event) => {
        actions.master.rowClick(record);
    }
    selectedRow = (record, index) => {
        console.log("selectedRow", index);
    }

    // 切换搜索框
    onToggleSearch = () => {
        let flag = this.props.searchFlag;
        flag = !flag;
        let tempState = {
            searchFlag:flag
        }
        actions.master.save(tempState);
    }

    onSearch=()=>{
        let {code,name} = this.state;
        let tempState = {
            search_code:code,
            search_name:name
        };
        actions.master.load(tempState);
    }
    onSearchInfoChange=(param)=>{
        return value=>{
            let json ={};
            json[param+""] = value;
            this.setState(json);
        }
    }
    clear=()=>{
        this.setState({
            code:"",
            name:""

        })
    }
    render() {
        let multiObj = {
            type: "checkbox"
        };
        /**
         *  masterData主表数据
         */
        let { showIndex, masterData, childData, refData, childPageFlag, cardPageChildData, count, childActivePage,searchFlag,checkedArray,rowData,btnFlag,paginationRes } = this.props;
        console.log("searchFlag", searchFlag);
        
        switch (showIndex) {
            case 0:
                return (
                    <div className="bgwhite">
                        <div className="pap-title">工单管理</div>
                        <div className="form-search">
                            <div className="u-panel-heading u-collapse-updown">
                                <span className="u-panel-title">查询与筛选
                                    <span className="u-link" onClick={this.onToggleSearch}>
                                        {
                                           function toggleInvisible(searchFlag){
                                               if(searchFlag) {
                                                    return (<div><span style={{padding: "0 5px"}}>收起</span><a className="uf uf-arrow-up"></a></div>);
                                               }else {
                                                    return (<div><span style={{padding: "0 5px"}}>展开</span><a className="uf uf-arrow-down"></a></div>)
                                               }
                                           }(searchFlag)
                                        }
                                        
                                    </span>
                                </span>
                            </div>
                            <div className={searchFlag ?"u-row u-panel-body b-searech-open":"u-row u-panel-body b-searech-close"}>
                                <Row>
                                    <Col md={1} xs={1} sm={1}>
                                        <div className='gray ml15 '>
                                            工单编码
                                        </div>
                                    </Col>
                                    <Col md={2} xs={2} sm={2} className="vertical-center" >
                                        <FormControl ref="code" onChange={this.onSearchInfoChange("code")} value={this.state.code} />
                                    </Col>
                                    <Col md={1} xs={1} sm={1}>
                                        <div className='gray ml15 '>
                                            工单名称
                                        </div>
                                    </Col>
                                    <Col md={2} xs={2} sm={2} className="vertical-center" >
                                        <FormControl ref="name" onChange={this.onSearchInfoChange("name")} value={this.state.name}/>
                                    </Col>
                                </Row>
                                <div className="float-right">
                                    <Button size="sm" shape="border" colors="info" className="ml15" onClick={this.clear}>清空</Button>
                                    <Button size="sm" colors="primary" className="ml15" onClick={this.onSearch}>搜索</Button>
                                </div>
                            </div>
                        </div>


                        <TableWrapper
                            data={masterData}
                            checkedArray={checkedArray}
                        /> 
                        
                        <div className="horizon-center">
                            <PaginationWrapper {...paginationRes}/>
                        </div>
                        
                    </div>
                );
            case 1:
                return (
                    <div>
                        <Card masterData={masterData} childData={childData} refData={refData} childPageFlag={childPageFlag}
                            cardPageChildData={cardPageChildData} count={count} childActivePage={childActivePage} 
                            rowData={rowData} btnFlag={btnFlag} />
                    </div>
                );
        }
    }
}

export default MasterTable;
