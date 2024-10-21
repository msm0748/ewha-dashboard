import {
  CalendarOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const menuList = [
  { icon: <UserOutlined />, label: '회원 관리', path: '/admin' },
  { icon: <BarChartOutlined />, label: '차트', path: '/admin/chart' },
  { icon: <CalendarOutlined />, label: '일정 관리', path: '/admin/calendar' },
  { icon: <LogoutOutlined />, label: '로그아웃', path: '/admin/logout' },
];

export default function AdminPageLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <div className="h-dvh flex">
      <Layout>
        <Sider trigger={null} collapsible>
          <div className="p-4 font-bold text-xl text-white">
            로고 or 노인 취약
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={menuList.map((menu, index) => {
              return {
                key: index.toString(),
                icon: menu.icon,
                label: menu.label,
                onClick: () => navigate(menu.path),
              };
            })}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
