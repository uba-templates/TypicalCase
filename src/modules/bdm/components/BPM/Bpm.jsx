import React, { Component } from 'react';
import queryString from 'query-string';
import { BpmWrap } from 'components/BpmWebSDK';
import {Button} from 'tinper-bee';
import {actions} from 'mirrorx';
import './index.less';

class Bpm extends Component {
    constructor(props) {
        super(props);
    }

    onBack = ()=>{
        actions.routing.goBack();
    }
   
    render() {
        let { id, processDefinitionId, processInstanceId } = queryString.parse(this.props.location.search);
        return (
            <div>
                <div>
                    <div className="topPart">
                        <Button size="sm" colors="primary" className="editable-add-btn backBtn" onClick={this.onBack}>返回</Button>
                        <h1>流程管理</h1>
                        <Button size="sm" shape="border" colors="info" className={this.props.btnFlag == 2 ? "hide" : "cancelBtn"}>取消</Button>
                        <Button size="sm" colors="primary" className={this.props.btnFlag == 2 ? "hide" : "saveBtn"} onClick={this.saveClick}>保存</Button>
                    </div>
                </div>
                <BpmWrap
                    id={id}
                    processDefinitionId={processDefinitionId}
                    processInstanceId={processInstanceId}
                />
            </div>
        );
    }
}

export default Bpm;
