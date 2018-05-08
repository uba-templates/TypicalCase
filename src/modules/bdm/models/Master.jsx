import {actions} from 'mirrorx';
import * as api from "../services/Master";
import { Info,Error } from "utils";

export default {
    name : "master",
    initialState : {
        data13: [],
        data13_1:[],
        selData:[],
        selChildData:[],
        showIndex:0,
        childData:{}
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
            let { data : {data:{data:{data,childData},success}} } = await api.get();
            let tempState = {
                data13:data,
                childData:childData,
                showIndex:0
            }
/*              console.log("data",data);
             console.log("childData",childData);
             console.log(success);  */   
            if (success) {
                console.log("执行save方法");
                actions.master.save(tempState);
            }else{
                Error('数据请求失败');
            }
        },
        clear(){
            actions.master.save({data13:[]});
            Info("数据清除完毕");
        },
        rowClick(data,getState){
            console.log("data",data);
            let {childData} = getState().master;
            console.log("childData",childData);
            let tempState = {
                data13_1 : childData[data]
            }
            actions.master.save(tempState);
        },
        async add(data,getState){
            let { data : { success } } = await api.add(data);
            if (success) {
                actions.master.load();
            }
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