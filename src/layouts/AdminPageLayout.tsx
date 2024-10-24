import {
  CalendarOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

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
  const location = useLocation();

  const [selectedKey, setSelectedKey] = useState(location.pathname);

  const navigate = useNavigate();

  const handleMenuClick = (path: string) => {
    setSelectedKey(path);
    navigate(path);
  };

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
            selectedKeys={[selectedKey]}
            items={menuList.map((menu) => {
              return {
                key: menu.path,
                icon: menu.icon,
                label: menu.label,
                onClick: () => handleMenuClick(menu.path),
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
