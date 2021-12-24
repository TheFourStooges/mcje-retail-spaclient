import React from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";
// import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.loading) {
        // Can be replaced with spinning icon
        return <h2>Loading...</h2>;
      } else if (!auth.authenticated) {
        return <Redirect to="/login" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
