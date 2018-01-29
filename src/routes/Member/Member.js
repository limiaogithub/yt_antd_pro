import React, { PureComponent } from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import { getRoutes } from '../../utils/utils';

export default class Member extends PureComponent {
  render() {
    const { match, routerData } = this.props;
    return (
      <div>
        <Switch>
          {
            getRoutes(match.path, routerData).map(item => (
              <Route
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            ))
          }
          <Redirect exact from="/member/member-manager" to="/member/member-manager/list" />
        </Switch>
      </div>
    );
  }
}
