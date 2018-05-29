import React, { Component } from 'react';
import {Button,FormControl,Label,Checkbox,InputNumber,Input,Col, Row,Icon,Select} from 'tinper-bee';
import Form from 'bee-form';
import { actions } from 'mirrorx';
import createModal from 'yyuap-ref';
import DatePicker from 'bee-datepicker';
import "bee-datepicker/build/DatePicker.css";
import zhCN from "rc-calendar/lib/locale/zh_CN";
import moment from "moment";
import ChildTable from '../AddChildTable';
import Test from '../Test/test';
const format = 'YYYY-MM-DD HH:mm:ss';

const dateInputPlaceholder = "选择日期";
import './index.less'

const Option = Select.Option;
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
const fieldArray = ["code","name","ly_code","ly_sm","zr_dw","zrr","xb_dw",
    "xbr","xbr","begin_date","end_date","zy_cd","qt_ld","zbr",
    "dbr","jfyq","db_info","jd_bl","rwpf","kpi_flag","kpi_level",
    "state","create_name","create_time","update_name","update_time",
    "unitid"]
function onChange(d){
    console.log(d);
}

function disabledDate(current){
    return current && current.valueOf() < Date.now();
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
    // 返回按钮点击事件
    backClick=()=>{
        actions.master.changePage({"showIndex":0})
    }
    // 参照图标点击事件
    refClick=(inputid,propForm)=>{
        // console.log(this.props.form)
        return (
            ()=>{
                let option = {
                    title: '参照类型',
                    refType:4,//1:树形 2.单表 3.树卡型 4.多选 5.default
                    isRadio:true,//1.true 单选 2.false多选
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
                        TreeGridUrl:'http://workbench.yyuap.com/ref/rest/iref_ctr/blobRefTree', //树表树请求
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
                    //   console.log("sels",sels,inputid);
                        let param = {
                            inputid:inputid,
                            singleRefData:sels
                        }
                        actions.master.setInputFromRef(param);
                        let {setFieldsValue} = propForm;
                        console.log(sels[0]["refname"]);
                        let obj={};
                        obj[inputid+""]=sels[0]["refname"];  
                        console.log(obj)
                        setFieldsValue(obj);
                    },
                }
                createModal(option);
            }
        );
        
    }

    taskSwitch=(tabFlag)=>{
        // tabFlag为true,表明点击的是任务分解标签；为false,表明点击的是附件信息标签
        return ()=>{
            actions.master.taskSwitch({childPageFlag:tabFlag});
        }
    }
    /**
     * 保存事件中进行字段验证,字段验证应该包括类型、格式、是否必输项
     * 
     */
    saveClick=()=>{
        
        console.log("saveClick",this.props.form);
        /* 
            first若为 true，则每一表单域的都会在碰到第一个失败了的校验规则后停止校验
            force对已经校验过的表单域，在 validateTrigger 再次被触发时是否再次校验
            这里设置force为true，验证不通过的同时触发validateTrigger弹出错误提示
        */
        this.props.form.validateFields(fieldArray,{
            first:false,
            force:true
        },(error,value)=>{
            console.log("error",error,value);
            if(!error){
                actions.master.addMasterData(value);
            }
        });
    }

    render() {
        const { getFieldProps, getFieldError,getFieldDecorator} = this.props.form;
        let {childPageFlag,cardPageChildData,count,childActivePage} = this.props;
        return (
            <div>
                <div className="page">
                    <div className="content">
                        <div className="topPart">
                            <Button size="sm" colors="info" className="backBtn" onClick={this.backClick}>返回</Button>
                            <h1>新建督办任务</h1>
                            <Button size="sm" shape="border" colors="info" className="cancelBtn">取消</Button>
                            <Button size="sm" colors="info" className="saveBtn" onClick={this.saveClick}>保存</Button>
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
                        <Form >
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label className="label_ajust">督办编号</Label>
                                        
                                        <FormControl  readOnly="readonly" className={"readonlyinput input_adjust require_icon_adjust"} placeholder="督办编号"
                                            
                                            {...getFieldProps('code', {
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type:'string',required: false, message: '请输入督办编号',
                                                }],
                                            }) } />
                                        <span className='error'>
                                            {getFieldError('code')}
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
                                                type:'string',required: true, message: '请输入督办名称',
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
                                        <Select
                                            {
                                                ...getFieldProps('ly_code', {
                                                    initialValue: '',
                                                    rules: [{ required: true,message:"请选择督办来源" }]
                                                }
                                            )}
                                        >
                                            <Option value="领导交办">领导交办</Option>
                                            <Option value="会议纪要">会议纪要</Option>
                                            <Option value="其他">其它</Option>
                                        </Select>
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
                                                type:'string',required: false, message: '请输入来源说明',
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
                                                required: false,type:'string',message: '请输入责任单位',
                                            }],
                                        }) } />
                                        <Icon type="uf-navmenu" key={"icon"} className="reficon_adjust" onClick={this.refClick("zr_dw",this.props.form)}></Icon>
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
                                                required: false,type:'string', message: '请输入责任人',
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
                                            id:"coorganizer",
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: false,type:'string', message: '请输入责任人',
                                            }],
                                        }) } />
                                        <Icon type="uf-navmenu" key={"icon"} className="reficon_adjust" onClick={this.refClick("xb_dw",this.props.form)}></Icon>
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
                                                required: false, type:'string',message: '请输入协办人',
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
                                        <div className="date_adjust require_icon_adjust">
                                            <DatePicker 
                                                name="time"
                                                format={format}
                                                onChange={onChange}
                                                locale={zhCN}
                                                disabledDate={disabledDate}
                                                placeholder={dateInputPlaceholder}
                                                {...getFieldProps('begin_date', {
                                                    validateTrigger: 'onBlur',
                                                    rules: [{
                                                        required: false, type: 'object',message: '请选择开始时间',
                                                    }],
                                                }) }
                                            />
                                        </div>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">计划结束日期</Label>
                                        <div className="date_adjust require_icon_adjust">
                                            <DatePicker 
                                                format={format}
                                                onChange={onChange}
                                                locale={zhCN}
                                                disabledDate={disabledDate}
                                                placeholder={dateInputPlaceholder}
                                                {...getFieldProps('end_date', {
                                                    validateTrigger: 'onBlur',
                                                    rules: [{
                                                        required: false, type: 'object',message: '请选择开始时间',
                                                    }],
                                                }) }
                                            />
                                        </div>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">重要程度</Label>
                                        <span style={{color:"#ff0000"}}>*</span>
                                        <Select
                                            searchPlaceholder="标签模式"
                                            {
                                                ...getFieldProps('zy_cd', {
                                                    initialValue: '',
                                                    validateTrigger: 'onBlur',
                                                    rules: [{ required: true,message:"请选择重要程度"}]
                                                }
                                            )}
                                        >
                                            <Option value="重要">重要</Option>
                                            <Option value="一般">一般</Option>
                                        </Select>
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
                                                required: false,type:'string',message: '请输入牵头领导',
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
                                                required: false,type:'string', message: '请输入主办人',
                                            }],
                                        }) } />
                                        <Icon type="uf-navmenu" key={"icon"} className="reficon_adjust" onClick={this.refClick("zbr",this.props.form)}></Icon>
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
                                                required: false,type:'string',message: '请输入督办人',
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
                                                required: false,type:'string',message: '请输入交付要求',
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
                                                required: false,type:'string',message: '请输入责任人',
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
                                                required: false,type:'string', message: '请输入进度比例',
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
                                        <FormControl className="input_adjust require_icon_adjust" placeholder="" 
                                        {...getFieldProps('rwpf', {
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: false,type:'string', message: '请输入任务评分',
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
                                        <Select
                                            searchPlaceholder="标签模式"
                                            {
                                                ...getFieldProps('kpi_flag', {
                                                    initialValue: '',
                                                    validateTrigger: 'onBlur',
                                                    rules: [{ required: true, message: '!请选择是否KPI' }]
                                                }
                                            )}
                                        >
                                            <Option value="是">是</Option>
                                            <Option value="否">否</Option>
                                        </Select>
                                        <span className='error'>
                                            {getFieldError('kpi_flag')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">KPI级别</Label>
                                        <span style={{color:"#ff0000"}}>*</span>
                                        <Select
                                            searchPlaceholder="标签模式"
                                            {
                                                ...getFieldProps('kpi_level', {
                                                    initialValue: '',
                                                    rules: [{ required: true, message: '!请输入KPI级别' }]
                                                }
                                            )}
                                        >
                                            <Option value="一级">一级</Option>
                                            <Option value="二级">二级</Option>
                                        </Select>
                                        <span className='error'>
                                            {getFieldError('kpi_level')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem >
                                        <Label className="label_ajust">状态</Label>
                                        <FormControl className="input_adjust require_icon_adjust" placeholder=""
                                         
                                        {...getFieldProps('state', {
                                            validateTrigger: 'onBlur',
                                            initialValue:"待确认",
                                            rules: [{
                                                required: false,type:'string', message: '!请输入状态'
                                            }],
                                        }) } 
                                        />
                                        <span className='error' >
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
                                                required: false,type:'string',message: '请选择组织',
                                            }],
                                        }) } />
                                        <Icon type="uf-navmenu" key={"icon"} className="reficon_adjust" onClick={this.refClick("unitid",this.props.form)}></Icon>
                                        <span className='error'>
                                            {getFieldError('unitid')}
                                        </span>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                        
                    </div>
                </div>
                <div className="childtable">
                    <div className="childhead">
                        <span className={childPageFlag?"workbreakdown":"annexinfo"} onClick={this.taskSwitch(true)}>任务分解</span>
                        <span className={childPageFlag?"annexinfo":"workbreakdown"} onClick={this.taskSwitch(false)}>附件信息</span>
                    </div>
                </div>
                {/* <div className="childContent">
                    <Button size="sm" colors="primary" onClick={this.addEmptyRow} className="childadd">增行</Button>
                </div> */}
                {/* <ChildTable cardPageChildData={cardPageChildData} count={count} /> */}
                {
                    function changePage(childPageFlag){
                        
                        if(childPageFlag){
                           console.log(childPageFlag);
                            return (
                                <ChildTable cardPageChildData={cardPageChildData} count={count} childActivePage={childActivePage}/>
                            );
                        }else {
                            return <div>附件信息</div>;
                        }
                    }(childPageFlag)
                }
                
            </div>
        );
    }
}

export default Form.createForm()(Add);