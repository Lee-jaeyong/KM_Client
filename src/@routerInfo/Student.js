import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { StudentRoute } from './StudentRoute';
import {
  Dashboard as DashboardView,
  StuReportList as StuReportListView,
  StuRefDataList as StuRefDataListView,
  StuMain as StuMainView,
  StuNoticeList as StuNoticeListView,
  StuQnAList as StuQnAListView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  StuReportInfo as StuReportInfoView
} from '../views/Student';

import {
  StudentMain as MainLayout,
  Minimal as MinimalLayout
} from '../layouts';

const Student = () => {
  return (
    <Switch>
      <StudentRoute
        component={DashboardView} //각 강의 메인
        exact
        layout={MainLayout}
        path="/stu/class/:classidx"
      />
      <StudentRoute
        //참고자료 리스트
        component={StuRefDataListView}
        exact
        layout={MainLayout}
        path="/stu/class/:classidx/refDataList"
      />
      <StudentRoute
        component={StuReportListView}
        exact
        layout={MainLayout}
        path="/stu/class/:classidx/reportList"
      />
      <StudentRoute
        component={StuMainView}
        exact
        layout={MainLayout}
        path="/stu/main"
      />
      <StudentRoute
        component={StuNoticeListView}
        exact
        layout={MainLayout}
        path="/stu/class/:classidx/noticeList"
      />
      <StudentRoute
        component={StuQnAListView}
        exact
        layout={MainLayout}
        path="/stu/class/:classidx/qnaList"
      />
      <StudentRoute
        component={StuReportInfoView}
        exact
        layout={MainLayout}
        path="/stu/class/:classidx/reportView/:reportidx"
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
