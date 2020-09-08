import React from 'react'; // import React
import styles from './login.module.scss'; // import scss stylesheet
import { Input, Form, Button, Avatar } from 'antd'; // import antd components
import { ImageBundle } from '../../assets' // import image
import { useHistory } from 'react-router-dom'; // import react-router-dom components
import BukuTamu from './components/buku-tamu/BukuTamu'; // import local components

const { LogoBem } = ImageBundle; // destructuring image


/**
 * display login form
 */
const Login = () => {
  let history = useHistory();
  console.log('Login Rendered');

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Avatar src={LogoBem} size={250} />
        </div>
        <div className={styles.right}>
          <h3>Login Siperat</h3>
          <Form
            layout='vertical'
            onFinish={() => history.push('/dashboard')}
          >
            <Form.Item
              name="nim"
              rules={[
                {
                  required: true,
                  message: 'Please input your nim!',
                },
              ]}
            >
              <Input placeholder='NIM' />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password placeholder='Password' />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
                </Button>
            </Form.Item>
          </Form>
          <div style={{ width: 205 }}>
            <BukuTamu />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;

