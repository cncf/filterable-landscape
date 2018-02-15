import React from 'react';
import { NavLink } from 'react-router-dom';

const Ad = () => {

  const url = "https://events.linuxfoundation.org/events/kubecon-cloudnativecon-europe-2018/?utm_source=interactive_landscape&utm_medium=web&utm_campaign=kccnceu18";
  const imgsrc = "/images/kubecon.jpg";

  return <NavLink className="sidebar-ad" 
  	to={url}
  	target="_blank">
    <img src={imgsrc} />
  </NavLink>
}
export default Ad;
