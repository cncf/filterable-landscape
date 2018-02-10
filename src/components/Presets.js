import React from 'react';
import { NavLink } from 'react-router-dom';

const presets = [{
  url: "/grouping=landscape",
  label: 'Landscape categories'
},{
  url:  "/grouping=landscape&landscape=monitoring&license=open-source&sort=stars",
  label: 'Open source monitoring projects by stars'
}, {
  url:   "/grouping=headquarters&headquarters=new-york-new-york",
  label: 'Offerings from New York'
}, {
  url: "/grouping=landscape&license=apache-2-0&sort=stars",
  label: 'Apache-licensed projects by category and popularity'
}];
const Presets = () => {
  return (
    <div className="sidebar-presets">{presets.map( entry => (
      <div><NavLink key={entry.url} className="preset" activeClassName="active" to={entry.url}>{entry.label}</NavLink></div>
    ))}
    </div>
  )
};
export default Presets;
