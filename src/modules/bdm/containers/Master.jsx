/*主子表容器 */
import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
// import MasterTable from "../components/Master";
// import UserModel from "../models/User";
import asyncComponent from 'components/AsyncComponent';
const MasterTable = asyncComponent(() => import('../components/Master'));
//注入Model
// mirror.model(UserModel);

//全局HOOK函数

mirror.hook((action, getState) => {
  const { routing: { location } } = getState();
  if (action.type === "@@router/LOCATION_CHANGE" && location.pathname === '/bdm/Master') {
    //actions.user.load();
  }
});




export default connect()(MasterTable);