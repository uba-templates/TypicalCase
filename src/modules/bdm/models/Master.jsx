import {actions} from 'mirrorx';
import * as api from "../services/Master";
import { Info,Error } from "utils";
/**
 * childTotalData为主表所对应子表所有数据
 * masterData主表数据
 * childData子表数据
 * cardPageChildData 卡片页面子表数据
 * childActivePage 卡片页面分页控件激活页
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
        childActivePage:1
    },
    reducers : {
        save(state, data) {
            console.log('数据改变')
            console.log(data)
            return {
                ...state,
                ...data
            }
        }
    },
    effects : {
        async load() {
            let { data : {data:{data:{data,childTotalData},success}} } = await api.get();
            let {data:{cardPageChildData}} = await api.getCardList();
            // console.log("cardPageChildData",cardPageChildData);
            let tempState = {
                masterData:data,
                childTotalData:childTotalData,
                showIndex:0,
                // cardPageChildData:cardPageChildData,
                count:0
            }
/*              console.log("data",data);
             console.log("childTotalData",childTotalData);
             console.log(success);  */   
            if (success) {
                console.log("执行save方法");
                actions.master.save(tempState);
            }else{
                Error('数据请求失败');
            }
        },
        clear(){
            actions.master.save({masterData:[]});
            Info("数据清除完毕");
        },
        rowClick(data,getState){
            console.log("data",data);
            let {childTotalData} = getState().master;
            console.log("childTotalData",childTotalData);
            let tempState = {
                childData : childTotalData[data]
            }
            actions.master.save(tempState);
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
            let { data : { success } } = await api.remove(data);
            if (success) {
                actions.master.load();
            }
        },

        async addMasterData(data,getState){
            // 添加数据应该提交到服务器上
            console.log("addMasterData",data);
            let {masterData,childTotalData,cardPageChildData} = getState().master;
            let length = masterData.length;
            childTotalData[length+""] = cardPageChildData;
            masterData.push(data);
            let tempState = {
                masterData : masterData,
                childTotalData:childTotalData
            }
            actions.master.save(tempState);

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
        }

    }
}