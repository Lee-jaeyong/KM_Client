import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { ProfessorRoute } from './ProfessorRoute';
import {
  Dashboard as DashboardView,
  ReportList as ReportListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  AddClass as AddClassView,
  ClassInfo as ClassInfoView,
  AddReport as AddReportView,
  AddRefereceData as AddRefereceDataView,
  ReferenceDataList as ReferenceDataListView,
  AddNotice as AddNoticeView,
  NoticeList as NoticeListView,
  UpdateClass as UpdateClassView,
  ReportInfo as ReportInfoView,
  ReferenceDataInfo as ReferenceDataInfoView,
  UpdateRefereceData as UpdateRefereceDataView,
  UpdateReport as UpdateReportView,
  NoticeInfo as NoticeInfoView
} from '../views/Professor';

import {
  ProfessorMain as MainLayout,
  Minimal as MinimalLayout
} from '../layouts';

const Professor = () => {
  return (
    <Switch>
      <ProfessorRoute
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <ProfessorRoute
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <ProfessorRoute
        component={AddReportView}
        exact
        layout={MainLayout}
        path="/class/:idx/report/add"
      />
      <ProfessorRoute
        component={UpdateReportView}
        exact
        layout={MainLayout}
        path="/class/:idx/report/update"
      />
      <ProfessorRoute
        component={ReportInfoView}
        exact
        layout={MainLayout}
        path="/class/report/:idx"
      />
      <ProfessorRoute
        component={ReportListView}
        exact
        layout={MainLayout}
        path="/class/:idx/reportList"
      />
      <ProfessorRoute
        component={AddClassView}
        exact
        layout={MainLayout}
        path="/class/add"
      />
      <ProfessorRoute
        component={ClassInfoView}
        exact
        layout={MainLayout}
        path="/class/:idx"
      />
      <ProfessorRoute
        component={ReferenceDataInfoView}
        exact
        layout={MainLayout}
        path="/class/referenceData/:idx"
      />
      <ProfessorRoute
        component={AddRefereceDataView}
        exact
        layout={MainLayout}
        path="/class/:idx/referenceData/add"
      />
      <ProfessorRoute
        component={UpdateRefereceDataView}
        exact
        layout={MainLayout}
        path="/class/:idx/referenceData/update"
      />
      <ProfessorRoute
        component={ReferenceDataListView}
        exact
        layout={MainLayout}
        path="/class/:idx/referenceDataList"
      />
      <ProfessorRoute
        component={NoticeInfoView}
        exact
        layout={MainLayout}
        path="/class/notice/:idx"
      />
      <ProfessorRoute
        component={AddNoticeView}
        exact
        layout={MainLayout}
        path="/class/:idx/notice/add"
      />
      <ProfessorRoute
        component={NoticeListView}
        exact
        layout={MainLayout}
        path="/class/:idx/noticeList"
      />
      <ProfessorRoute
        component={NoticeListView}
        exact
        layout={MainLayout}
        path="/class/:idx/QnA"
      />
      <ProfessorRoute
        component={UpdateClassView}
        exact
        layout={MainLayout}
        path="/class/:idx/update"
      />
      <ProfessorRoute
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <ProfessorRoute
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons/:id"
      />
      <ProfessorRoute
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <ProfessorRoute
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <ProfessorRoute
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <ProfessorRoute
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <ProfessorRoute
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
    </Switch>
  );
};

export default Professor;
