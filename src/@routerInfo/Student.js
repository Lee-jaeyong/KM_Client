import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { StudentRoute } from './StudentRoute';
import {
  Dashboard as DashboardView,
  StuReportList as StuReportListView,
  UserList as UserListView,
  StuMain as StuMainView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView
} from '../views/Student';

import {
  StudentMain as MainLayout,
  Minimal as MinimalLayout
} from '../layouts';

const Student = () => {
  return (
    <Switch>
      <StudentRoute
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/a"
      />
      <StudentRoute
        component={UserListView}
        exact
        layout={MainLayout}
        path="/b"
      />
      <StudentRoute
        component={StuReportListView}
        exact
        layout={MainLayout}
        path="/list/report"
      />
      <StudentRoute
        component={StuMainView}
        exact
        layout={MainLayout}
        path="/stu/main"
      />
      <StudentRoute
        component={IconsView}
        exact
        layout={MainLayout}
        path="/e"
      />
      <StudentRoute
        component={AccountView}
        exact
        layout={MainLayout}
        path="/f"
      />
      <StudentRoute
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/g"
      />
    </Switch>
  );
};

export default Student;
