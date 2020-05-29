import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {  useSelector } from 'react-redux';
import { selectUid, selectIsLoggedIn } from 'app/Garage/user/userSlice';
const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;
  const id = useSelector(selectUid);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <Route
      {...rest}
      render={matchProps => (
        (id&&isLoggedIn)?(
        <Layout>
          <Component {...matchProps} />
        </Layout>
      ):<Redirect to={{pathname:"/sign-in",state:{from:matchProps.location}}} />)}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
