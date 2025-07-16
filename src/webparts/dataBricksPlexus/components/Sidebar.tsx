import * as React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div
      className={`sidebar ${expanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* <div className="home-item">
        <NavLink to="/" className="d-flex align-items-center text-white text-decoration-none">
          <i className="bi bi-house-fill home-icon"></i>
          {expanded && <span className="home-text ms-2">Home Page</span>}
        </NavLink>
      </div> */}
      <div className="home-item mt-3">
        <NavLink to="/" className="d-flex align-items-center text-white text-decoration-none">
          <i className="bi bi-table home-icon"></i>
          {expanded && <span className="home-text ms-2">DataSet - 1</span>}
        </NavLink>
      </div>
      <div className="home-item mt-3">
        <NavLink to="/dataset2" className="d-flex align-items-center text-white text-decoration-none">
          <i className="bi bi-table home-icon"></i>
          {expanded && <span className="home-text ms-2">DataSet - 2</span>}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
