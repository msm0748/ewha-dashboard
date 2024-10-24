import { Route, Routes } from 'react-router-dom';
import UsersPage from './pages/Admin/UsersPage';
import AdminPageLayout from './layouts/AdminPageLayout';
import ChartPage from './pages/Admin/ChartPage';
import CalendarPage from './pages/Admin/CalendarPage';
import HomPage from './pages/Admin/HomePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomPage />} />
      <Route path="/admin" element={<AdminPageLayout />}>
        <Route index element={<UsersPage />} />
        <Route path="chart" element={<ChartPage />} />
        <Route path="calendar" element={<CalendarPage />} />
      </Route>
    </Routes>
  );
};

export default App;
