/**
 * 核心功能函数处理类
 */

import axios from 'axios';
import { Message } from 'tinper-bee';

export const timestampToDate = (_stamp, formatStr = 'yyyy-MM-dd  hh:mm:ss') => {
    let unixTimestamp = new Date(_stamp);
    {
        var str = formatStr;
        var Week = ['日', '一', '二', '三', '四', '五', '六'];

        str = str.replace(/yyyy|YYYY/, unixTimestamp.getFullYear());
        str = str.replace(/yy|YY/, (unixTimestamp.getYear() % 100) > 9 ? (unixTimestamp.getYear() % 100).toString() : '0' + (unixTimestamp.getYear() % 100));
        var month = unixTimestamp.getMonth() + 1;
        str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
        str = str.replace(/M/g, month);

        str = str.replace(/w|W/g, Week[unixTimestamp.getDay()]);

        str = str.replace(/dd|DD/, unixTimestamp.getDate() > 9 ? unixTimestamp.getDate().toString() : '0' + unixTimestamp.getDate());
        str = str.replace(/d|D/g, unixTimestamp.getDate());

        str = str.replace(/hh|HH/, unixTimestamp.getHours() > 9 ? unixTimestamp.getHours().toString() : '0' + unixTimestamp.getHours());
        str = str.replace(/h|H/g, unixTimestamp.getHours());
        str = str.replace(/mm/, unixTimestamp.getMinutes() > 9 ? unixTimestamp.getMinutes().toString() : '0' + unixTimestamp.getMinutes());
        str = str.replace(/m/g, unixTimestamp.getMinutes());

        str = str.replace(/ss|SS/, unixTimestamp.getSeconds() > 9 ? unixTimestamp.getSeconds().toString() : '0' + unixTimestamp.getSeconds());
        str = str.replace(/s|S/g, unixTimestamp.getSeconds());
        return str;
    }
}

export const descriptionToText = (vApproveType) => {
    if (vApproveType == 'submit') {
        return '提交';
    }
    if (vApproveType == 'agree') {
        return '审批';
    }
    if (vApproveType == 'unagree') {
        return '不同意';
    }
    if (vApproveType == 'reject') {
        return '驳回';
    }
    if (vApproveType == 'signAdd') {
        return '加签';
    }
    if (vApproveType == 'signAdding') {
        return '加签中';
    }
    if (vApproveType == 'delegate') {
        return '改派';
    }
    if (vApproveType == 'termination') {
        return '终止';
    }
    if (vApproveType == 'withdraw') {
        //return  '弃审'   ;
        return '删除';
    }
}

export const getBpmTaskURL = (type, root = "eiap-plus/") => {
    switch (type) {
        case 'agree':
            return root + 'task/completetask/approveCard';
            break;
        case 'unagree':
            return root + 'task/completetask/approveCard';
            break;
        case 'rejectToActivity':
            return root + 'task/rejecttask/bfreject';
            break;
        case 'rejectToBillMaker':
            return root + 'task/rejecttask/reject';
            break;
        case 'signAdd':
            return root + 'task/assignee/getlist';
            break;
        case 'delegate':
            return root + 'task/assignee/getlist';
            break;
        case 'withdraw':
            return root + 'task/withdrawtask/withdraw';
            break;
        default:
            break;
    }
}

export const sendBpmTaskAJAX = (type, data) => {
    switch (type) {
        case 'agree':
            return axios.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId,
            }).catch((e) => {
                Message.create({ content: `${e.toString()}`, color: 'danger', position: 'top' });
            })
        case 'unagree':
            return axios.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId,
            }).catch((e) => {
                Message.create({ content: `${e.toString()}`, color: 'danger', position: 'top' });
            })
        case 'rejectToActivity':
            return axios.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId,
            }).catch((e) => {
                Message.create({ content: `${e.toString()}`, color: 'danger', position: 'top' });
            })
        case 'rejectToBillMaker':
            return axios.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId,
                activityId: "markerbill"
            }).catch((e) => {
                Message.create({ content: `${e.toString()}`, color: 'danger', position: 'top' });
            })
        case 'signAdd':
            return axios.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId,
                pageNum: 1,
                pageSize: 2000
            }).catch((e) => {
                Message.create({ content: `${e.toString()}`, color: 'danger', position: 'top' });
            })
        case 'delegate':
            return axios.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId,
                pageNum: 1,
                pageSize: 2000
            }).catch((e) => {
                Message.create({ content: `${e.toString()}`, color: 'danger', position: 'top' });
            })
        case 'withdraw':
            return axios.post(getBpmTaskURL(type), {
                approvetype: data.approvetype,
                comment: data.comment,
                processDefinitionId: data.processDefinitionId,
                processInstanceId: data.processInstanceId,
                taskId: data.taskId
            }).catch((e) => {
                Message.create({ content: `${e.toString()}`, color: 'danger', position: 'top' });
            })
        default:
            break;
    }
    return axios.post(getBpmTaskURL(type), data).catch((e) => {
        Message.create({ content: `${e.toString()}`, color: 'danger', position: 'top' });
    })
}

export const billidToIds = (billId) => {
    return axios.post('eiap-plus/process/getbillbpm',{
        billId
    });
}
