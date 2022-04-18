import React, { cloneElement } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function ActiveLink({ children, goTo, activeChildren, noActive }) {
  const { pathname } = useLocation();
  const className = pathname === goTo ? activeChildren : noActive;

  return <Link to={goTo}>{cloneElement(children, { className })}</Link>;
}
