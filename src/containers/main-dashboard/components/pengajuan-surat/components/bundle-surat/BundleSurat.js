import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Select, Input, Divider } from 'antd';
import { listOption } from '../../../../../../configs';
import {
  EditFilled,
  DeleteFilled,
  CloseOutlined,
  CheckOutlined
} from '@ant-design/icons';
import styles from './bundlesurat.module.scss';

const { Options } = Select;

const defaultBundle = {
  jenis: '',
  penerima: '',
  namaPenerima: '',
  hal: '',
  lampiran: '',
  keterangan: '',
  link: ''
}

const FormBundle = ({ datas, idx, bundle, setBundle }) => {
  const [data, setData] = useState(datas);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setData(datas)
  }, [bundle])

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
        <p>Surat {idx + 1}</p>
        <Form>
          <Form.Item>
            <Select
              placeholder='Jenis Surat'
              defaultValue={data.jenis}
              value={data.jenis}
              onChange={val => handleChange('jenis', val)}
              disabled={!edit}
            >
              {listOption.listJenisSurat.map(val => <Options value={val.value} > {val.text} </Options>)}
            </Select>
          </Form.Item>
          <Form.Item>
            <Select
              placeholder='Penerima Surat'
              defaultValue={data.penerima}
              value={data.penerima}
              onChange={val => handleChange('penerima', val)}
              disabled={!edit}
            >
              {[{ value: 'internal', text: 'Internal' }, { value: 'eksternal', text: 'Eksternal' }].map(val => <Options value={val.value} > {val.text} </Options>)}
            </Select>
          </Form.Item>
          <Form.Item>
            <Input
              defaultValue={data.namaPenerima}
              value={data.namaPenerima}
              onChange={e => handleChange('namaPenerima', e.target.value)}
              disabled={!edit}
            />
          </Form.Item>
          <Form.Item>
            <Input
              defaultValue={data.hal}
              value={data.hal}
              onChange={e => handleChange('hal', e.target.value)}
              disabled={!edit}
            />
          </Form.Item>
          <Form.Item>
            <Input
              defaultValue={data.lampiran}
              value={data.lampiran}
              onChange={e => handleChange('lampiran', e.target.value)}
              disabled={!edit}
            />
          </Form.Item>
          <Form.Item>
            <Input
              defaultValue={data.keterangan}
              value={data.keterangan}
              onChange={e => handleChange('keterangan', e.target.value)}
              disabled={!edit}
            />
          </Form.Item>
          <Form.Item name='link'>
            <Input
              defaultValue={data.link}
              value={data.link}
              onChange={e => handleChange('link', e.target.value)}
              disabled={!edit}
            />
          </Form.Item>
        </Form>
      </div>
      <div className={styles.bundleRight}>
        <Button type='primary'>
          Save
            </Button>
        <Button
          onClick={() => setEdit(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

const BundleSurat = ({ record }) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button type='text' onClick={() => setVisible(true)}>Edit</Button>
      <Modal
        title="Detail Surat"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
        style={{ top: 20 }}
      >
        <FormBundle />
      </Modal>
    </>
  )
}

export default BundleSurat;


