import React, { useState } from 'react'; // import React
import { Modal, Button, Form, DatePicker, Input, message } from 'antd' // import antd components
import {
  SendOutlined
} from '@ant-design/icons'; // import antd icon components


/**
 * Display form buku tamu
 */
const BukuTamu = () => {
  const [visible, setVisible] = useState(false);
  const [valid, setValid] = useState(false);
  console.log('Buku Tamu Rendered');

  return (
    <>
      <Button
        block
        onClick={() => setVisible(true)}
      >
        Buku Tamu
      </Button>
      <Modal
        title="Buku Tamu"
        visible={visible}
        onOk={() => { setVisible(false); setValid(false) }}
        onCancel={() => { setVisible(false); setValid(false) }}
        footer={null}
        style={{ top: 20 }}
      >
        <div>
          {
            valid ? (
              <Form
                onFinish={value => console.log('inputan : ',value)}
                layout='vertical'
              >
                <Form.Item
                  name="nama"
                  label="Nama"
                  rules={[
                    {
                      required: true,
                      message: 'Field tidak boleh kosong!!',
                    },
                  ]}
                >
                  <Input placeholder="Masukkan nama" />
                </Form.Item>
                <Form.Item
                  name="asal"
                  label="Asal"
                  rules={[
                    {
                      required: true,
                      message: 'Field tidak boleh kosong!!',
                    },
                  ]}
                >
                  <Input placeholder="Masukkan asal komunitas/organisasi" />
                </Form.Item>
                <Form.Item
                  name="kontak"
                  label="Kontak"
                  rules={[
                    {
                      required: true,
                      message: 'Field tidak boleh kosong!!',
                    },
                  ]}
                >
                  <Input placeholder="Masukkan no WA/Id Line" />
                </Form.Item>
                <Form.Item
                  name="keperluan"
                  label="Keperluan"
                  rules={[
                    {
                      required: true,
                      message: 'Field tidak boleh kosong!!',
                    },
                  ]}
                >
                  <Input placeholder="Masukkan Keperluan" />
                </Form.Item>
                <Form.Item
                  name="tanggal"
                  label="Tanggal Acara"
                >
                  <DatePicker 
                    style={{width : '100%'}} 
                    placeholder="Masukkan tanggal undangan/acara jika ada" 
                    onChange={(date, dateString) => console.log(dateString)} 
                  />
                </Form.Item>
                <Form.Item>
                  <Button icon={<SendOutlined />} type="primary" htmlType="submit" block>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            ) : (
                <div>
                  <Form
                    layout='vertical'
                    onFinish={values => {
                      if (values.pin === '123456') {
                        setValid(true);
                      } else {
                        message.error('PIN Salah!!!')
                      }
                    }}
                  >
                    <Form.Item
                      name="pin"
                      label="Pin -> Demo : 123456"
                      rules={[
                        {
                          required: true,
                          message: 'Field tidak boleh kosong!!',
                        },
                      ]}
                    >
                      <Input placeholder="Masukkan Pin" />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" block>
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              )
          }
        </div>
      </Modal>
    </>
  )
}

export default BukuTamu;

