import React from 'react';
import { Switch,Redirect } from 'react-router-dom';
import { ProfessorRoute } from './ProfessorRoute';
import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
} from '../views/Professor';

import { Main as MainLayout, Minimal as MinimalLayout } from '../layouts';

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
          component={ProductListView}
          exact
          layout={MainLayout}
          path="/products"
      />
      <ProfessorRoute
          component={TypographyView}
          exact
          layout={MainLayout}
          path="/typography"
      />
      <ProfessorRoute
          component={IconsView}
          exact
          layout={MainLayout}
          path="/icons"
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
