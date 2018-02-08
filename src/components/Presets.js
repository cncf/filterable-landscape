import React from 'react';

const Presets = () => {
  return (
  <div className="sidebar-presets">
  	<div><a className="preset active" href="/grouping=landscape">Landscape categories</a></div>
  	<div><a className="preset" href="/grouping=landscape&landscape=monitoring&license=open-source&sort=stars">Open source monitoring projects by stars</a></div>
  	<div><a className="preset" href="/grouping=headquarters&headquarters=new-york-new-york">Offerings from New York</a></div>
  	<div><a className="preset" href="/grouping=landscape&license=apache-2-0&sort=stars">Apache-licensed projects by category and popularity</a></div>
  </div>
  )
};
export default Presets;
