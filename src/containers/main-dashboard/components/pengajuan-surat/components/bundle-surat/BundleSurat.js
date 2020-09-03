import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Select, Input } from 'antd';
import { listOption } from '../../../../../../configs';
import styles from './bundlesurat.module.scss';

const { Option } = Select;

const FormBundle = ({ record, idx, setBundle, setVisible }) => {
  const [data, setData] = useState(record);

  useEffect(() => {
    setData(record)
  }, [record])

  const handleChange = (key, val) => {
    setData(state => {
      return {
        ...state,
        [key]: val
      }
    })
  }

  return (
    <div className={styles.bundleContainer}>
      <div className={styles.bundleLeft}>
        <div>
          <span>Surat {idx + 1}</span>
          <br /><br />
        </div>
        <Form
          onFinish={() => {
            setBundle(state => state.map((val, i) => {
              return i === idx ? data : val
            }))
            setVisible(false)
          }}
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Data tidak boleh kosong!'
              },
            ]}
          >
            <Select
              placeholder='Jenis Surat'
              defaultValue={data.jenis !== '' && data.jenis}
              value={data.jenis}
              onChange={val => handleChange('jenis', val)}
            >
              {listOption.listJenisSurat.map(val => <Option value={val.value} > {val.text} </Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Data tidak boleh kosong!'
              },
            ]}
          >
            <Select
              placeholder='Penerima Surat'
              defaultValue={data.penerima !== '' && data.penerima}
              value={data.penerima !== '' ? data.penerima : undefined}
              onChange={val => handleChange('penerima', val)}
            >
              {[{ value: 'internal', text: 'Internal' }, { value: 'eksternal', text: 'Eksternal' }].map(val => <Option value={val.value} > {val.text} </Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Data tidak boleh kosong!'
              },
            ]}
          >
            <Input
              placeholder='Nama Penerima'
              defaultValue={data.namaPenerima}
              value={data.namaPenerima}
              onChange={e => handleChange('namaPenerima', e.target.value)}
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Data tidak boleh kosong!'
              },
            ]}
          >
            <Input
              placeholder='Perihal'
              defaultValue={data.hal}
              value={data.hal}
              onChange={e => handleChange('hal', e.target.value)}
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Data tidak boleh kosong!'
              },
            ]}
          >
            <Input
              placeholder='Lampiran'
              defaultValue={data.lampiran}
              value={data.lampiran}
              onChange={e => handleChange('lampiran', e.target.value)}
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Data tidak boleh kosong!'
              },
            ]}
          >
            <Input
              placeholder='Keterangan'
              defaultValue={data.keterangan}
              value={data.keterangan}
              onChange={e => handleChange('keterangan', e.target.value)}
            />
          </Form.Item>
          <Form.Item name='link'
            rules={[
              {
                required: true,
                message: 'Data tidak boleh kosong!'
              },
            ]}
          >
            <Input
              placeholder='Link File'
              defaultValue={data.link}
              value={data.link}
              onChange={e => handleChange('link', e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <div className={styles.bundleRight}>
              <Button type='primary' htmlType='submit'>
                Save
              </Button>
              <Button
                onClick={() => setVisible(false)}
              >
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

const BundleSurat = ({ setBundle, ...rest }) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button type='link' onClick={() => setVisible(true)}>Edit</Button>
      <Modal
        title="Detail Surat"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
        style={{ top: 20 }}
      >
        <FormBundle
          {...rest}
          setBundle={setBundle}
          setVisible={setVisible}
        />
      </Modal>
    </>
  )
}

export default BundleSurat;


