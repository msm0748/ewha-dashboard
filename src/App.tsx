import { Route, Routes } from 'react-router-dom';
import UsersPage from './pages/Admin/UsersPage';
import AdminPageLayout from './layouts/AdminPageLayout';
// import ChartPage from './pages/Admin/ChartPage';
import CalendarPage from './pages/Admin/CalendarPage';
import HomPage from './pages/HomePage';
import AdminPage from './pages/Admin';
import UserPage from './pages/Admin/UserPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomPage />} />
      <Route path="/admin" element={<AdminPageLayout />}>
        <Route index element={<AdminPage />} />
        <Route path="users">
          <Route index element={<UsersPage />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>
        {/* <Route path="chart" element={<ChartPage />} /> */}
        <Route path="calendar" element={<CalendarPage />} />
      </Route>
    </Routes>
  );
};

export default App;
