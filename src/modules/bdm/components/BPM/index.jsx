import React, { Component } from 'react';
import {Button} from 'tinper-bee';
import {actions} from 'mirrorx';
import './index.less'

class BPM extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    onBack = ()=>{
        
    }
    render() {
        return (
            <div>
                <div className="topPart">
                    <Button size="sm" colors="primary" className="editable-add-btn backBtn" onClick={this.onBack}>返回</Button>
                    <h1>流程管理</h1>
                    <Button size="sm" shape="border" colors="info" className={this.props.btnFlag==2? "hide":"cancelBtn"}>取消</Button>
                    <Button size="sm" colors="primary" className={this.props.btnFlag==2? "hide":"saveBtn"} onClick={this.saveClick}>保存</Button>
                </div>
            </div>
        );
    }
}

export default BPM;