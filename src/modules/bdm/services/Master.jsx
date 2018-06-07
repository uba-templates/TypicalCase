import axios from 'axios';
import request from 'utils/request';

const URL = {
    "GET_List": "/iuap-example/example_workorder/list",
    "DELETE_List": "/iuap-example/example_workorder/delete",
    "SAVE_FORM":"/iuap-example/example_workorder/save",
    "QUERY_BPM_URL":"/eiap-plus/appResAllocate/queryBpmTemplateAllocate/",
    "COMMIT_URL":"/iuap-example/example_workorder/submit",
    "RECALL_URL":"/iuap-example/example_workorder/recall"
}

export const get = (param) => {
    console.log("param",param);
    return request(URL.GET_List, {
        method: "get",
        param : param
    });
}

export const save = (formData) => {
    return request(URL.SAVE_FORM, {
        method: "post",
        data: formData
    });
}

export const add = (list) => {
    return request(URL.ADD_List, {
        method: "post",
        data: list
    });
}

export const remove = (list) => {
    console.log(list);
    return request(URL.DELETE_List, {
        method: "post",
        data: list
    });
}

export const getCardList=()=>{
    return request(URL.CARD_LIST, {
        method: "get"
    });
}

export const queryBpm = (param)=>{
    console.log("param",param);
    return request(URL.QUERY_BPM_URL, {
        method: "get",
        param :param
    });
}

export const onCommit = (data)=>{
    console.log("processDefineCode",data['processDefineCode']);
    return request(URL.COMMIT_URL, {
        method: "post",
        data :data['submitArray'],
        param:{"processDefineCode":data['processDefineCode']}
    });
}

export const onRecall = (data)=>{
    return request(URL.RECALL_URL, {
        method: "post",
        data :data
    });
}
