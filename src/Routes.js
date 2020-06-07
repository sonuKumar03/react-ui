import React from 'react';
import { Switch, Redirect,Route } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  AddStore as AddStoreView,
  Store as StoreView,
  Services,
  Account,
  Profile
} from './views'; 
import ShedulesView from  'views/Store/components/Shedules'
import PropTypes from 'prop-types';
const Sonu=()=>{
  return <h3>SONU IS THE BEST</h3>
}

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
      component={ShedulesView}
      exact
      layout={MainLayout}
      path='/shedules'
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={StoreView}
        exact
        layout={MainLayout}
        path="/store"
      />
        <RouteWithLayout
        component={Account}
        exact
        layout={MainLayout}
        path="/account"
      />
        <RouteWithLayout
        component={Profile}
        exact
        layout={MainLayout}
        path="/profile"
      />
      <RouteWithLayout
        component={Sonu}
        exact
        layout={MinimalLayout}
        path="/sonu"
      />
       <RouteWithLayout
        component={AddStoreView}
        exact
        layout={MinimalLayout}
        path="/addstore"
      />
      <RouteWithLayout
        component={Services}
        exact
        layout={MainLayout}
        path="/services"
      />
      <PRouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <PRouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <PRouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

const PRouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};



export default Routes;
