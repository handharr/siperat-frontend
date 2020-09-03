import React, { useState, useEffect } from 'react';
import styles from './pengajuansurat.module.scss';
import { Form, Select, Input, Button, Table, message } from 'antd';
import { listOption } from '../../../../configs';
import {
  PlusOutlined
} from '@ant-design/icons';
import BundleSurat from './components/bundle-surat/BundleSurat';

const { Option } = Select;

const expandedRowRender = (record) => {
  return (
    <div className={styles.expandedWrapper}>
      <table>
        <colgroup>
          <col span='1' />
          <col span='1' />
        </colgroup>
        <tbody>
          <tr>
            <td>Lampiran</td>
            <td>: {record.lampiran}</td>
          </tr>
          <tr>
            <td>Hal</td>
            <td>: {record.hal}</td>
          </tr>
          <tr>
            <td>Keterangan</td>
            <td>: {record.keterangan}</td>
          </tr>
          <tr>
            <td>Link File</td>
            <td>: <a href='www.google.com' target='_blank' >{record.link}</a> </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const defaultBundle = {
  jenis: undefined,
  penerima: undefined,
  namaPenerima: '',
  hal: '',
  lampiran: '',
  keterangan: '',
  link: ''
}

const PengajuanSurat = () => {
  const [kontak, setKontak] = useState('');
  const [pengirim, setPengirim] = useState('');
  const [acara, setAcara] = useState('');
  const [bundle, setBundle] = useState([]);

  const columns = [
    {
      key: 'jenis',
      title: 'Jenis',
      dataIndex: 'jenis',
      width: '20%'
    },
    {
      key: 'penerima',
      title: 'Penerima',
      dataIndex: 'penerima',
      width: '20%'
    },
    {
      key: 'namaPenerima',
      title: 'Nama Penerima',
      dataIndex: 'namaPenerima',
      width: '20%'
    },
    {
      key: 'link',
      title: 'Link',
      dataIndex: 'link',
    },
    {
      key: 'action',
      title: 'Action',
      fixed: 'right',
      render: (t, record, index) => {
        return (
          <>
            <BundleSurat record={record} idx={index} setBundle={setBundle} />
            <Button type='link' danger >Delete</Button>
          </>
        )
      }
    }
  ];

  return (
    <div>
      <p><b>User/Admin</b></p>
      <Form
        layout='vertical'
        onFinish={() => {
          if (bundle.length > 0) {
            let empty = false;
            for (let i = 0; i < bundle.length; i++) {
              let values = Object.values(bundle[i]);
              if (values.includes(undefined) || values.includes('')) {
                empty = true;
                break;
              }
            }
            return empty ? message.error('Semua surat harus diisi!!') : message.success('Surat berhasil di kirim :)');
          } else {
            message.error('Paling tidak masukkan 1 surat!!')
          }
        }}
      >
        <Form.Item
          name="nim"
          label="NIM"
          initialValue='175150400111045'
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="nama"
          label="Nama"
          initialValue='Puras Handharmahua'
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="kontak"
          label="Kontak"
          initialValue={kontak}
          rules={[
            {
              required: true,
              message: 'Data tidak boleh kosong!'
            },
          ]}
        >
          <Input placeholder='WA/Id Line' value={kontak} onChange={e => setKontak(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="pengirim"
          label="Pengirim"
          initialValue={pengirim ? pengirim : null}
          rules={[
            {
              required: true,
              message: 'Data tidak boleh kosong!'
            },
          ]}
        >
          <Select
            placeholder='Pilih Pengirim'
            onChange={val => setPengirim(val)}
            value={pengirim}
          >
            {listOption.listPengirim.map((val) => {
              return <Option value={val.value} > {val.text} </Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="acara"
          label="Acara"
          initialValue={acara}
          rules={[
            {
              required: true,
              message: 'Data tidak boleh kosong!'
            },
          ]}
        >
          <Input placeholder='Nama Acara' value={acara} onChange={e => setAcara(e.target.value)} />
        </Form.Item>
        <Form.Item label='List Surat'>
          <div className={styles.divTambahSurat}>
            <Button
              type='primary'
              icon={<PlusOutlined />}
              onClick={() => {
                setBundle(state => [...state, defaultBundle])
              }}
            >
              Tambah Surat
            </Button>
            <br /><br />
          </div>
          <Table
            columns={columns}
            dataSource={bundle}
            pagination={false}
            expandable={{ expandedRowRender }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
          >
            Kirim
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default PengajuanSurat;

