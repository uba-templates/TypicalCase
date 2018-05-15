import React, { Component } from 'react';
import createModal  from 'yyuap-ref';

const option = {
    title: '弹窗标题',
    refType:3,//1:树形 2.单表 3.树卡型 4.多选 5.default
    isRadio:false,//1.true 单选 2.false多选
    hasPage:true,
    tabData:[//tab标签
        {"title":"常用","key":"commonUse"},
        {"title":"全部","key":"total"},
        {"title":"推荐","key":"recommed"}
    ],// option中可增加defaultActiveKey作为默认tab标签
    param:{//url请求参数
        refCode:'test_treeTable',//test_common||test_grid||test_tree||test_treeTable
        tenantId:'xxx',
        sysId:'xxx',
        refModelUrl: 'http://workbench.yyuap.com/ref/rest/testref_ctr/'
    },
    refModelUrl:{
        TreeUrl:'http://workbench.yyuap.com/ref/rest/iref_ctr/blobRefTree', //树请求
        GridUrl:'http://workbench.yyuap.com/ref/rest/iref_ctr/commonRefsearch',//单选多选请求
        TableBodyUrl:'http://workbench.yyuap.com/ref/rest/iref_ctr/blobRefTreeGrid',//表体请求
        TableBarUrl:'http://workbench.yyuap.com/ref/rest/iref_ctr/refInfo',//表头请求
    },
    checkedArray:[{refremark: "用友骨干", refpk: "857c41b7-e1a3-11e5-aa70-0242ac11001d", refcode: "wujd", refname: "吴惊道", key: "857c41b7-e1a3-11e5-aa70-0242ac11001d"}],
    onCancel: function (p) {
      console.log(p)
    },
    onSave: function (sels) {
      console.log(sels);
    },
}

class MasterRef extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                {
                    createModal(option)
                }
            </div>
        );
    }
}

export default MasterRef;

