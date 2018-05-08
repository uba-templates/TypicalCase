/*主子表容器 */
import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import MasterModel from '../models/Master';
import asyncComponent from 'components/AsyncComponent';
const MasterTable = asyncComponent(() => import('../components/Master'));
//注入Model
mirror.model(MasterModel);

//全局HOOK函数

mirror.hook((action, getState) => {
  const { routing: { location } } = getState();
  if (action.type === "@@router/LOCATION_CHANGE" && location.pathname === '/bdm/Master') {
    console.log("执行load方法");
    actions.master.load();
  }
});




export default connect((state) => state.master)(MasterTable);