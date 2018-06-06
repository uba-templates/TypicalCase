/**
 * test
 */

import React, { Component } from 'react';
import { Table, Row, Col, Button } from 'tinper-bee';
import axios from 'axios';

class BpmTestCheckTable extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            factoryValue: {}
        };
        this.columns = [
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
                width: "30%"
            },
            {
                title: "ID",
                dataIndex: "id",
                key: "id"
            },
            {
                title: "processDefinitionId",
                dataIndex: "processDefinitionId",
                key: "processDefinitionId"
            },
            {
                title: "processInstanceId",
                dataIndex: "processInstanceId",
                key: "processInstanceId"
            }
        ];
    }
    componentDidMount = async () => {
        let { processDefinitionId, processInstanceId, host } = this.props;
        let hisTasklist = `eiap-plus/process/undoTasklist`;
        let hisTasklistData = await axios.post(hisTasklist, { "draw": 1, "length": 10, "order": {}, "search": { "search_EQ_code": "", "undefined": "", "processDefinitionName": "", "billno": "" }, "searchconfirm": {} });
        console.log(hisTasklistData)
        this.setState({
            data: hisTasklistData.data.data
        });
    }
    render() {
        return (<Table
            bordered
            emptyText={() => <span>暂时没有数据</span>}
            columns={this.columns}
            data={this.state.data}
            title={() => <Button onClick={() => {
                console.log(this.state.factoryValue);
                window.open(`http://127.0.0.1:3000/#/bdm/bpm?id=${this.state.factoryValue.id}`);
            }}>打开审批</Button>}
            onRowClick={(record, index, indent) => {
                this.setState({
                    factoryValue: record
                });
            }}
        />);
    }
}

export default BpmTestCheckTable;
