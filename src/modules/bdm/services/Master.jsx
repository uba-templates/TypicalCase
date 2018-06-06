import axios from 'axios';
import request from 'utils/request';

const URL = {
    "GET_List": "/iuap-example/example_workorder/list",
    "DELETE_List": "/iuap-example/example_workorder/delete",
    "SAVE_FORM":"/iuap-example/example_workorder/save",
    "QUERY_BPM_URL":"/eiap-plus/appResAllocate/queryBpmTemplateAllocate/",
    "COMMIT_URL":"/example/ygdemo_yw_info/submit",
    "RECALL_URL":"/example/ygdemo_yw_info/unsubmit"
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

export const COMMIT_URL = (param)=>{
    return request(URL.COMMIT_URL, {
        method: "post",
        param :param
    });
}
