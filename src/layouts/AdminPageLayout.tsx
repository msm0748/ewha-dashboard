import {
  CalendarOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useLayoutStore } from '../store/useLayoutStore';

const { Sider, Content } = Layout;

const menuList = [
  { icon: <UserOutlined />, label: '회원 관리', path: '/admin/users' },
  { icon: <BarChartOutlined />, label: '차트', path: '/admin/chart' },
  { icon: <CalendarOutlined />, label: '일정 관리', path: '/admin/calendar' },
  { icon: <LogoutOutlined />, label: '로그아웃', path: '/admin/logout' },
];

export default function AdminPageLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const title = useLayoutStore((state) => state.title);

  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();

  const [selectedKey, setSelectedKey] = useState(location.pathname);

  const navigate = useNavigate();

  const handleMenuClick = (path: string) => {
    setSelectedKey(path);
    navigate(path);
  };

  const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    position: 'fixed',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
  };

  return (
    <div className="min-h-dvh flex">
      <Layout hasSider>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={siderStyle}
        >
          {!collapsed && (
            <div className="p-4 font-bold text-xl text-white">로고</div>
          )}
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
        <Layout style={{ marginInlineStart: collapsed ? 80 : 200 }}>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <div className="flex items-center">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ fontSize: '16px', width: 64, height: 64 }}
              />
              <h1 className="text-xl font-semibold">{title}</h1>
            </div>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 48,
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
