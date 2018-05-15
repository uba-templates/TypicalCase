import {actions} from 'mirrorx';
import * as api from "../services/Master";
import { Info,Error } from "utils";
/**
 * childTotalData为主表所对应子表所有数据
 * masterData主表数据
 * childData子表数据
 */

export default {
    name : "master",
    initialState : {
        masterData: [],
        childData:[],
        selData:[],
        selChildData:[],
        showIndex:0,
        childTotalData:{}
    },
    reducers : {
        save(state, data) {
            console.log(state,data)
            return {
                ...state,
                ...data
            }
        }
    },
    effects : {
        async load() {
            let { data : {data:{data:{data,childTotalData},success}} } = await api.get();
            let tempState = {
                masterData:data,
                childTotalData:childTotalData,
                showIndex:0
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
        async add(data,getState){
            let tempState = {
                showIndex:1
            }
            actions.master.save(tempState);
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
        }
    }
}