import React, { Component } from 'react';
import { actions } from "mirrorx";
import {Pagination,Select,FormControl,Button} from 'tinper-bee';
import './index.less';

const Option = Select.Option;
const pageSize =[5,10,20];

class PaginationWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            pageIndex:0,
            pageSize:5,
            pageNum:1,
            activePage:1
        };
    }
    onPageChange= async (eventKey)=>{
        // 切换显示的页数
        alert(eventKey);
        this.setState({
            activePage:eventKey
        });
        await actions.master.save({
            paginationParam:{
                pageIndex:eventKey-1,
                pageSize:this.state.pageSize
            }
        });
        await actions.master.load();
    }

    onNumberChange = (value)=>{
        // 改变每页显示数目
        console.log("每页显示条数",value);
        this.setState({
            pageSize:value,
        })
    }

    onConfirm = ()=>{
        // 点击确定进行页面重新加载
        let {pageSize,pageNum} = this.state;
        let tempState = {
            paginationParam:{
                pageSize: pageSize,
                pageIndex:(pageNum>0 ? pageNum-1 :0)
            }
        }
        actions.master.save(tempState);
        actions.master.load();
    }
    onPageNumChange = (value)=>{
        console.log("pageNum",value);
        // 页码改变
        this.setState({
            pageNum:value
        })
    }
    render() {
        let {totalElements,totalPages} = this.props;
        let {activePage} = this.state;
        const sizeItem = pageSize.map((item,index)=>{
           return <Option key={item}>{item}</Option>
        })
        console.log(this.props);
        return (
            <div>
                <Pagination
                    first
                    last
                    prev
                    next
                    boundaryLinks
                    items={totalPages>0?totalPages:0}
                    maxButtons={5}
                    activePage={activePage}
                    className="pagination-adjust"
                    onSelect={this.onPageChange}
                />
                <div className="number">共&nbsp;{totalElements}&nbsp;条</div>
                <div className="horizon-adjust">显示&nbsp;
                    <Select 
                        defaultValue = "5"
                        className="select-adjust"
                        onChange={this.onNumberChange}>
                        {sizeItem}
                    </Select>&nbsp;条
                </div>
                <div className="input-adjust">到&nbsp;
                    <FormControl 
                        onChange={this.onPageNumChange}
                        size="lg"
                    />
                    &nbsp;页
                </div>
                <Button shape="border"
                    className="btn-adjust"
                    onClick={this.onConfirm}
                >确定</Button>
            </div>
        );
    }
}

export default PaginationWrapper;