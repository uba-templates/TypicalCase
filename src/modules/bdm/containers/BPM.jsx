/**
 * 业务容器组件
 */

import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import asyncComponent from 'components/AsyncComponent';
import BPModel from "../models/BPM";
const Bpm = asyncComponent(() => import('../components/BPM/Bpm'));
//注入Model
mirror.model(BPModel);

//全局HOOK函数

mirror.hook((action, getState) => {
  const { routing: { location } } = getState();
  if (action.type === "@@router/LOCATION_CHANGE" && location.pathname === '/bdm/user') {
    actions.bpm.load();
  }
});




export default connect((state) => state.bpm)(Bpm);
