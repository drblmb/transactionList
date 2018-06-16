import React from 'react';
import { Route } from 'react-router-dom';
import { routes } from 'router';

const wrapWithRoute = (route, render) => (
  <Route
    key={route.path}
    exact={route.exact}
    path={route.path}
    component={route.component}
    render={render}
  />
);

const renderContent = () =>
  routes
    .filter(route => route.component)
    .map(route => wrapWithRoute(route));

export default function Layout() {
  return (
    <div id="layout">
      {renderContent()}
    </div>
  );
}
