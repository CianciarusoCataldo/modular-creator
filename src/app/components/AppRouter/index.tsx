import React from "react";

import { History } from "history";

import { useSelector } from "react-redux";

import { getHomePage, getRoutes } from "modular-plugins";

import { Redirect, Route, RouteProps, Router, Switch } from "react-router-dom";
import { Container } from "modular-ui-components";

const AppRouter = ({
  history,
  renderCallback,
}: {
  history: History;
  renderCallback: (route: string) => RouteProps["component"];
}) => {
  const PAGES = useSelector(getRoutes);
  const HOME = useSelector(getHomePage);

  return (
    <Container
      unstyled
      style={{
        position: "relative",
        width: "100%",
        overflow: "auto",
        height: "100%",
      }}
    >
      <Router history={history}>
        <Switch>
          {Object.keys(PAGES).map((route) => {
            return (
              <Route
                component={renderCallback(route)}
                key={route}
                exact
                path={PAGES[route]}
              />
            );
          })}
          <Redirect to={HOME} />
        </Switch>
      </Router>
    </Container>
  );
};

export default AppRouter;
