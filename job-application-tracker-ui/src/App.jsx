import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import AddApplication from './pages/AddApplication';
import ApplicationDetails from './pages/ApplicationDetails';
import EditApplication from './pages/EditApplication';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/applications"
          element={<Applications />}
        />
        <Route
          path="/applications/new"
          element={<AddApplication />}
        />
        <Route
          path="/applications/:id"
          element={<ApplicationDetails />}
        />
        <Route
          path="/applications/:id/edit"
          element={<EditApplication />}
        />
      </Route>
    </Routes>
  );
}
