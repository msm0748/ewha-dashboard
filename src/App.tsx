import { Route, Routes } from 'react-router-dom';
import UsersPage from './pages/Admin/UsersPage';
import AdminPageLayout from './Layouts/AdminPageLayout';
import ChartPage from './pages/Admin/ChartPage';
import CalendarPage from './pages/Admin/CalendarPage';

const App = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPageLayout />}>
        <Route index element={<UsersPage />} />
        <Route path="chart" element={<ChartPage />} />
        <Route path="calendar" element={<CalendarPage />} />
      </Route>
    </Routes>
  );
};

export default App;
