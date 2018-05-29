import axios from 'axios';
import request from 'utils/request';

const URL = {
    "GET_List": "https://mock.yonyoucloud.com/mock/204/test/getData",
    "ADD_List": "https://mock.yonyoucloud.com/mock/204/test/addData",
    "EDIT_List": "https://mock.yonyoucloud.com/test/editData",
    "DELETE_List": "https://mock.yonyoucloud.com/test/deleteData",
    "CARD_LIST":"https://mock.yonyoucloud.com/mock/204/test/getRefData"
}

export const get = () => {
    return request(URL.GET_List, {
        method: "get"
    });
}

export const add = (list) => {
    return request(URL.ADD_List, {
        method: "post",
        data: list
    });
}

export const edit = (list) => {
    return request(URL.EDIT_List, {
        method: "post",
        data: list
    });
}

export const remove = (list) => {
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
