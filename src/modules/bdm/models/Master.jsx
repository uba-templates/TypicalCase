import {actions} from 'mirrorx';
import * as api from "../services/Master";
import { Info,Error } from "utils";
import moment from 'moment';
/**
 * childTotalData为主表所对应子表所有数据
 * masterData主表数据
 * childData子表数据
 * cardPageChildData 卡片页面子表数据
 * childActivePage 卡片页面分页控件激活页
 * searchFlag 为搜索框显示和隐藏标志
 * activePage 为分页控件当前的显示页
 * btnFlag 为按钮状态，新增、修改是可编辑，查看详情不可编辑，
 *          新增表格为空
 *          修改需要将行数据带上并显示在卡片页面
 *          查看详情携带行数据但是表格不可编辑
 *          0表示新增、1表示修改，2表示查看详情 3提交
 * rowData 为行数据字段
 * paginationParam为分页的请求参数
 * paginationRes为请求列表返回的分页信息如总页数、总数据条数
 */

export default {
    name : "master",
    initialState : {
        masterData: [],
        childData:[],
        selData:[],
        selChildData:[],
        showIndex:0,
        childTotalData:{},
        refData:{},
        childPageFlag:true,
        cardPageChildData:[],
        childActivePage:1,
        searchFlag:true,
        activePage:0,
        btnFlag:0,
        paginationParam:{
            pageIndex:0,
            pageSize:5
        },
        paginationRes:{
            totalElements:0,
            totalPages:0
        },
        checkedArray:[],
        rowData:{}
    },
    reducers : {
        save(state, data) {
            return {
                ...state,
                ...data
            }
        }
    },
    effects : {
        async load(data,getState) {
            let paginationParam = getState().master.paginationParam;
            let reqParam = Object.assign({},data,paginationParam);
            console.log("reqParam",reqParam)
            let {data:{success,detailMsg:{data:{content,totalElements,totalPages}}}} = await api.get(reqParam);
            console.log(success,content);
            if(content){
                content = content.map((item,index)=>{
                    console.log("applyTime",moment(item.applyTime).format('YYYY-MM-DD HH:mm:ss'));
                    // return Object.assign({},item,{"key":item.id,"applyTime":moment(item.applyTime).format('YYYY-MM-DD HH:mm:ss')});
                    return Object.assign({},item,{"applyTime":moment(item.applyTime).format('YYYY-MM-DD HH:mm:ss')});
                })
            }
            let tempState = {
                masterData:[],
                childTotalData:[],
                showIndex:0,
                // cardPageChildData:cardPageChildData,
                count:0,
                paginationRes:{
                    totalElements:totalElements,
                    totalPages:totalPages
                }
            }
            if (success=="success") {
                // console.log("成功获取数据",content);
                tempState.masterData = content;
                actions.master.save(tempState);
            }else{
                Error('数据请求失败');
            }
        },
        clear(){
            actions.master.save({masterData:[]});
            Info("数据清除完毕");
        },
        async rowClick(data,getState){
            let search_fk_id_ygdemo_yw_sub = data["id"]?data["id"]:"";
            let param = {
                search_fk_id_ygdemo_yw_sub
            }
            let {data:{success,detailMsg:{data:{content}}}} = await api.getChildList(param);
            console.log("data",data);
            console.log("content",content)
            let tempState = {
                childData:[],
            }
            if (success=="success") {
                console.log("成功获取数据");
                tempState.childData = content;
                actions.master.save(tempState);
            }else{
                Error('数据请求失败');
            }

        },
        setInputFromRef(data,getState){
            let {refData} = getState().master;
            refData[data.inputid] = data.singleRefData[0].refname;
            actions.master.save(refData);
        },
        async changePage(data,getState){
            console.log(data);
            /* let tempState = {
                showIndex:1
            } */
            actions.master.save(data);
        },
        async createByPage(data,getState){
            let { data : { success } } = await api.add(data);
            if (success) {
                Info("用户添加成功");
                actions.routing.goBack();
            }
        },
        async edit(data,getState){
            let { data : { success } } = await api.edit(data);
            if (success) {
                actions.master.load();
            }
        },
        async editByPage(data,getState){
            let { data : { success } } = await api.edit(data);
            if (success) {
                Info("用户修改成功");
                actions.routing.goBack();
            }
        },
        
        async remove(data,getState){
            // let { data : { success } } = await api.remove(data);
            /* let json = await api.remove(data);
            console.log(JSON.stringify(json)); */
            if (success=="success") {
                actions.master.load();
            }
        },

        async addMasterData(data,getState){
            // 添加数据应该提交到服务器上
            console.log("addMasterData",data);
            let result = await api.save(data);
            console.log(JSON.stringify(result));
            let {data:{success}} = result;
            console.log("addMasterData",success)
        },

        async taskSwitch(data,getState) {
            console.log("taskSwitch",data);
            actions.master.save(data);
        },
        // 改变卡片页面子页面数据
        async changeCardList(data,getState){
            console.log(data);
            let tempState = {
                cardPageChildData : data
            }
            actions.master.save(tempState);
        },

        // 卡片页面添加空行
        async addEmptyRow(data,getState){
            console.log("addEmptyRow",data);
            actions.master.save(data);
        },

        // 删除卡片页面空行
        async deleteEmptyRow(data,getState){
            actions.master.save({cardPageChildData:[]});
            actions.master.save(data);
        },

        // 改变卡片页面任务分解功能中分页控件
        async changeChildPagination(data,getState) {
            actions.master.save(data);
        },

        // 提交数据
        async onCommit(data,getState) {
            // 先去查询是否启动了bpm流程，如果没有启动则直接进行提交，如果已经启动则提示已
            // let { data : { success } } = await api.queryBpm(data);
            let {funccode,nodekey} = data;
            let bpmParam = {
                funccode :funccode,
                nodekey : nodekey
            }
            let json = await api.queryBpm(bpmParam);
            console.log("查询",JSON.stringify(json));
            /* if (success) {
                actions.master.load();

            } */
        },

        // 撤回
        async onRecall(data,getState) {
            let json = await api.onRecall(data);
            console.log("撤回",JSON.stringify(json));
        }
    }
}