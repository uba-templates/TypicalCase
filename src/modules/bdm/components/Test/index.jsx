import React, { Component } from 'react';
import createModal from 'yyuap-ref';


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
        refCode:'test_treeTable',
        tenantId:'xxx',
        sysId:'xxx',
        refModelUrl: 'http://workbench.yyuap.com/ref/rest/testref_ctr/'
    },
    refModelUrl:{
        TreeUrl:'http://workbench.yyuap.com/ref/rest/iref_ctr/blobRefTree', //树请求
        GridUrl:'http://workbench.yyuap.com/ref/rest/iref_ctr/commonRefsearch',//单选多选请求
        TableBodyUrl:'http://workbench.yyuap.com/ref/rest/iref_ctr/blobRefTreeGrid',//表体请求
        TableBarUrl:'http://workbench.yyuap.com/ref/rest/iref_ctr/refInfo',//表头请求
        totalDataUrl:'http://workbench.yyuap.com/ref/diwork/iref_ctr/matchPKRefJSON',//根据refcode请求完整数据
 
    },
    checkedArray:[{refremark: "用友骨干", refpk: "857c41b7-e1a3-11e5-aa70-0242ac11001d", refcode: "wujd", refname: "吴惊道", key: "857c41b7-e1a3-11e5-aa70-0242ac11001d"}],
    onCancel: function (p) {
      console.log(p)
    },
    onSave: function (sels) {
      console.log(sels);
    },
}

const op = {
    title: '弹窗标题',
    RefSearch: true,
    isTab: false,
    isTree: true,
    RefButton: true,
    tabData: {},
    multiple: false,
    checkedArray: [],
    param: {
      refCode: 'glxzzz',
      refModelUrl: 'http://d835dxtp.c87e2267-1001-4c70-bb2a-ab41f3b81aa3.app.yyuap.com/basedoc-mc/ref/adminableorg/',
      pk_user: 'f07e2142-482b-448a-a1fd-5cb9a48c5d39',
      tenantId: 'gtzceot7',
      sysId: 'diwork',
    },
  onCancel: function () {
    console.log('cancel');
  },
  onSave: function (sels) {
    console.log(sels);
  },
};

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    onclick=()=>{
        createModal(option);
    }
    render() {
        return (
            <div onClick={this.onclick}>
                点击弹出参照
            </div>

        );
    }
}

export default Test;