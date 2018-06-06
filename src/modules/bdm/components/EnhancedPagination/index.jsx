import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Pagination from 'bee-pagination';

const EnhancedPagination = WrappedComponent =>{
    
    return class extends Component {
        static  propTypes = {
            dataNumSelect:PropTypes.array,//下拉框展示每页显示的条数
            dataNum:PropTypes.number,//下拉框默认选中的
        }
        static defaultProps ={
            dataNumSelect: [
                { id: 0, name: '5条/页' },
                { id: 1, name: '10条/页' },
                { id: 2, name: '15条/页' },
                { id: 3, name: '20条/页' }
            ],
            dataNum:0,
        }
        constructor(props) {
            super(props);
            this.state={
                activePage:this.props.activePage,//当前的页码
            }
        }
        componentWillReceiveProps(nextProps){
            if (this.state.activePage !== nextProps.activePage){
                this.setState({
                    activePage:nextProps.activePage,
                })
            }
        }

        onKeyup = (e) =>{
            e.keyCode === 13 && this.setPageJump(e)
        }

        setPageJump = (e) =>{
            let value = e.target.value;
            if((value < 1 && value!=='')||value > this.props.items || (value == 0 && value !== '')){
                return false;
            }else{
                //注意这里要将下拉的数据还原
                this.setState({activePage:value},function(){
                    if(value!== '')this.props.onSelect(value*1)
                })
            }
        }

        dataNumSelect = (e) =>{
            let value = e.target.value*1;
            let dataNumValue = this.props.dataNumSelect[value].name
            this.setState({
                dataNum:value
            })
            if(this.props.onDataNumSelect){
                this.props.onDataNumSelect(value,dataNumValue)
            }
        }

        render() {
            const newProps = {
                maxButtons:5,
                boundaryLinks:true,
                first: true,
                last: true,
                prev: true,
                next: true,
                boundaryLinks: true,
                size: 'sm',
                gap: true,
                maxButtons: 4,
            }
            console.log(EnhancedPagination.defaultProps)
            const {onDataNumSelect,dataNumSelect,dataNum,...restProps} = this.props

            return (
                <div className={"enhanced_pagination"}>
                    <WrappedComponent  {...newProps} {...restProps}  className={"u_float_pagination"}/>
                    <div className={"data_per_select"}>
                        <select  name="data-select" id="" className={"data_select"}  value={dataNum} onChange={e=>this.dataNumSelect(e)}>
                        {dataNumSelect.length > 0 && dataNumSelect.map((item, i) => {
                        return <option key={i} value={item.id}>{item.name}</option>
                        })}
                        </select>
                    </div>
                    <div className={"page_jump"}>
                        跳至<input className={"page_jump_value"} type='number' value={this.state.activePage} onKeyDown={e=>this.onKeyup(e)} onChange={e=>this.setPageJump(e) }/>页
                    </div>
                </div>
            )
        }
    
    }
}

export default EnhancedPagination(Pagination);


