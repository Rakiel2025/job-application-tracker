import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Job Tracker</h2>
      <nav>
        <NavLink to="/">Dashboard</NavLink>
        {' | '}
        <NavLink to="/applications">Applications</NavLink>
      </nav>
    </aside>
  );
}