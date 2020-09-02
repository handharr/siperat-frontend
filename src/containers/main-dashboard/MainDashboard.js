import React, { useState } from 'react';
import styles from './main.module.scss';
import { Menu, Layout, Breadcrumb } from 'antd';
import { useHistory, Switch, Route } from 'react-router-dom';
import { DaftarPengajuan, PengajuanSurat } from './components';
import {
  OrderedListOutlined,
  LogoutOutlined,
  FormOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const MainDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  let history = useHistory();

  const onCollapse = clsd => {
    console.log(clsd);
    setCollapsed(clsd)
  };

  return (
    <div className={styles.container}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className={styles.logo} />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<OrderedListOutlined />} onClick={()=>history.push('/dashboard')}>
              Daftar Pengajuan Surat
            </Menu.Item>
            <Menu.Item key="2" icon={<FormOutlined />} onClick={()=>history.push('/dashboard/pengajuan-surat')}>
              Pengajuan Surat
            </Menu.Item>
            <Menu.Item
              key="9"
              icon={<LogoutOutlined />}
              onClick={() => history.push('/')}
            >
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, backgroundColor: 'white' }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Switch>
                <Route path='/dashboard' exact>
                  <DaftarPengajuan />
                </Route>
                <Route path='/dashboard/pengajuan-surat' exact>
                  <PengajuanSurat />
                </Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Siperat Front-end ©2020 Created by Puras Handharmahua</Footer>
        </Layout>
      </Layout>
    </div>
  )
}

export default MainDashboard;

