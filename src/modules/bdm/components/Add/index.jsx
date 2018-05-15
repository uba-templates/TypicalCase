import React, { Component } from 'react';
import {Button,FormControl,Label,Checkbox,InputNumber,Input,Col, Row,Icon} from 'tinper-bee';
import Form from 'bee-form';
import { actions } from 'mirrorx';
import createModal from 'yyuap-ref';

import './index.less'
const FormItem = Form.FormItem;
const tempArray = [
    {"labelname":"督办编号","field":"code","hasRef":false},
    {"labelname":"督办名称","field":"name","hasRef":true},
    {"labelname":"督办来源","field":"ly_code","hasRef":true},
    {"labelname":"来源说明","field":"ly_sm","hasRef":false},
    {"labelname":"责任单位","field":"zr_dw","hasRef":true},
    {"labelname":"责任人","field":"zrr","hasRef":false},
    {"labelname":"协办单位","field":"xb_dw","hasRef":true},
    {"labelname":"协办人","field":"xbr","hasRef":false},
    {"labelname":"计划开始日期","field":"begin_date","hasRef":false},
    {"labelname":"计划结束日期","field":"end_date","hasRef":false},
    {"labelname":"重要程度","field":"zy_cd","hasRef":false},
    {"labelname":"牵头领导","field":"qt_ld","hasRef":false},
    {"labelname":"主办人","field":"zbr","hasRef":true},
    {"labelname":"督办人","field":"dbr","hasRef":false},
    {"labelname":"交付要求","field":"jfyq","hasRef":false},
    {"labelname":"督办事宜","field":"db_info","hasRef":false},
    {"labelname":"进度比例","field":"jd_bl","hasRef":false},
    {"labelname":"任务评分","field":"rwpf","hasRef":false},
    {"labelname":"是否KPI","field":"kpi_flag","hasRef":false},
    {"labelname":"KPI级别","field":"kpi_level","hasRef":false},
    {"labelname":"状态","field":"state","hasRef":false},
    {"labelname":"创建人","field":"create_name","hasRef":true},
    {"labelname":"创建时间","field":"create_time","hasRef":false},
    {"labelname":"最后修改人","field":"update_name","hasRef":true},
    {"labelname":"最后修改日期","field":"update_time","hasRef":false},
    {"labelname":"所属组织","field":"unitid","hasRef":true},
];

const option = {
    title: '弹窗标题',
    refType:4,//1:树形 2.单表 3.树卡型 4.多选 5.default
    isRadio:false,//1.true 单选 2.false多选
    hasPage:true,
    tabData:[//tab标签
        {"title":"常用","key":"commonUse"},
        {"title":"全部","key":"total"},
        {"title":"推荐","key":"recommed"}
    ],// option中可增加defaultActiveKey作为默认tab标签
    param:{//url请求参数
        refCode:'test_grid',
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

//createModal((function(){console.log(option);return option})());

class Add extends Component {
    constructor(props) {
        super(props);
    }
    inputFocus=(field)=>{
        
        return (
            ()=>{
                console.log(field);                                                                 
                createModal(option);
            }
        )
    }
    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        // console.log(this.props);
        return (
            <div>
                <div className="page">
                    <div className="content">
                        <div className="topPart">
                            <Button size="sm" colors="info" className="backBtn" >返回</Button>
                            <h1>新建督办任务</h1>
                            <Button size="sm" shape="border" colors="info" className="cancelBtn">取消</Button>
                            <Button size="sm" colors="info" className="saveBtn">保存</Button>
                        </div>
                    </div>
                </div>
                <div className="content">
                     {/*
                    <Form >
                         {
                            tempArray.map((item,index)=>{
                                // console.log(item);
                                return (
                                    <FormItem key={index}>
                                        <Label>{item.labelname}:</Label>
                                        <FormControl placeholder=""
                                            {...getFieldProps(item.field, {
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    required: false, message: `${item.labelname}未输入`,
                                                }],
                                            })}
                                            onFocus={this.inputFocus(item.field)}
                                        />
                                        <span className='error'>
                                            {getFieldError(item.field)}
                                        </span>
                                    </FormItem>
                                )
                            })
                        }  
                        <FormItem key={"01"}>
                            <Label>督办编号:</Label>
                            <FormControl placeholder=""
                                {...getFieldProps("code", {
                                    validateTrigger: 'onBlur',
                                    rules: [{
                                        required: true, message: `未输入`,
                                    }],
                                })}
                            />
                            <span className='error'>
                                {getFieldError("code")}
                            </span>
                        </FormItem> 
                    </Form>*/ }
                    <div className="user-form">
                        <Form useRow={true}>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label className="label_ajust">督办编号</Label>
                                        
                                        <FormControl  readOnly="readonly" className={"readonlyinput input_adjust require_icon_adjust"} placeholder="督办编号"
                                            
                                            {...getFieldProps('code', {
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    required: true, message: '请输入用户名',
                                                }],
                                            }) } />
                                        <span className='error'>
                                            {getFieldError('username')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label className="label_ajust">督办名称</Label>
                                        <span style={{color:"#ff0000"}}>*</span>
                                        <FormControl className="input_adjust"  placeholder="" 
                                        {...getFieldProps('name', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: true, message: '请输入督办名称',
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('name')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">督办来源</Label>
                                        <span style={{color:"#ff0000"}}>*</span>
                                        <FormControl className="input_adjust" placeholder="" 
                                        {...getFieldProps('ly_code', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: true, message: '请输入督办来源',
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('ly_code')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">来源说明</Label>
                                        <FormControl className="input_adjust require_icon_adjust" placeholder="" 
                                        {...getFieldProps('ly_sm', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: true, message: '请输入来源说明',
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('ly_sm')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">责任单位</Label>
                                        <FormControl className="input_adjust require_icon_adjust" placeholder="" 
                                        {...getFieldProps('zr_dw', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: true, message: '请输入责任单位',
                                            }],
                                        }) } />
                                        {/* <Icon type="uf-navmenu" key={"icon"}></Icon> */}
                                        <span className='error'>
                                            {getFieldError('zr_dw')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">责任人</Label>
                                        <FormControl className="input_adjust require_icon_adjust" placeholder="" 
                                        {...getFieldProps('zrr', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: false, message: '请输入责任人',
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('zrr')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">协办单位</Label>
                                        <FormControl className="input_adjust require_icon_adjust" placeholder="" 
                                        {...getFieldProps('xb_dw', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: false, message: '请输入责任人',
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('xb_dw')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">协办人</Label>
                                        <FormControl className="input_adjust require_icon_adjust" placeholder="" 
                                        {...getFieldProps('xbr', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: false, message: '请输入协办人',
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('xbr')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">计划开始日期</Label>
                                        <FormControl className="input_adjust require_icon_adjust" placeholder="" 
                                        {...getFieldProps('begin_date', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: false, message: '请选择开始日期',
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('begin_date')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">计划结束日期</Label>
                                        <FormControl className="input_adjust require_icon_adjust" placeholder="" 
                                        {...getFieldProps('end_date', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: false, message: '请选择计划结束日期',
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('end_date')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">重要程度</Label>
                                        <span style={{color:"#ff0000"}}>*</span>
                                        <FormControl className="input_adjust" placeholder="" 
                                        {...getFieldProps('zy_cd', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: true, message: '请选择重要程度',
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('zy_cd')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">牵头领导</Label>
                                        <FormControl className="input_adjust require_icon_adjust" placeholder="" 
                                        {...getFieldProps('qt_ld', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: false, message: '请输入牵头领导',
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('qt_ld')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">主办人</Label>
                                        <FormControl className="input_adjust require_icon_adjust" placeholder="" 
                                        {...getFieldProps('zbr', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: false, message: '请输入主办人',
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('zbr')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">督办人</Label>
                                        <FormControl className="input_adjust require_icon_adjust" placeholder="" 
                                        {...getFieldProps('dbr', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: false, message: '请输入督办人',
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('dbr')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">交付要求</Label>
                                        <FormControl className="input_adjust require_icon_adjust" placeholder="" 
                                        {...getFieldProps('jfyq', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: false, message: '请输入交付要求',
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('jfyq')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">督办事宜</Label>
                                        <FormControl className="input_adjust require_icon_adjust" placeholder="" 
                                        {...getFieldProps('db_info', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: false, message: '请输入责任人',
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('db_info')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">进度比例</Label>
                                        <FormControl className="input_adjust require_icon_adjust" placeholder="" 
                                        {...getFieldProps('jd_bl', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: false, message: '请输入进度比例',
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('jd_bl')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">任务评分</Label>
                                        <FormControl className="input_adjust" placeholder="" 
                                        {...getFieldProps('rwpf', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: false, message: '请输入任务评分',
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('rwpf')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">是否KPI</Label>
                                        <span style={{color:"#ff0000"}}>*</span>
                                        <FormControl className="input_adjust" placeholder="" 
                                        {...getFieldProps('xb_dw', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: true, message: '请选择是否KPI',
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('xb_dw')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">KPI级别</Label>
                                        <span style={{color:"#ff0000"}}>*</span>
                                        <FormControl className="input_adjust" placeholder="" 
                                        {...getFieldProps('xb_dw', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: false, message: '请输入责任人',
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('xb_dw')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">状态</Label>
                                        <FormControl className="input_adjust require_icon_adjust" placeholder=""
                                        value={"待确认"} 
                                        {...getFieldProps('state', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: false
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('state')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">所属组织</Label>
                                        <FormControl className="input_adjust require_icon_adjust" placeholder="" 
                                        {...getFieldProps('unitid', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: false, message: '请选择组织',
                                            }],
                                        }) } />
                                        <span className='error'>
                                            {getFieldError('unitid')}
                                        </span>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                        
                    </div>
                </div>

            </div>
        );
    }
}

export default Form.createForm()(Add);