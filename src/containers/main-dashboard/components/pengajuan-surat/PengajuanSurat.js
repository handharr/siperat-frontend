import React, { useState } from 'react';
import styles from './pengajuansurat.module.scss';
import { Form, Select, Input, Button, Table } from 'antd';
import { listOption } from '../../../../configs';
import BundleSurat from './components/bundle-surat/BundleSurat';

const { Option } = Select;

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
    render: record => <BundleSurat record={record} />
  }
];

// const dummyData;

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
        </tbody>
      </table>
    </div>
  )
}

const defaultBundle = {
  jenis: 'Permohonan',
  penerima: 'Eksternal',
  namaPenerima: 'Lembaga Lain',
  hal: 'blablabla',
  lampiran: 'blablabla',
  keterangan: 'blablabla',
  link: 'ko;hhohoh'
}

const PengajuanSurat = () => {
  const [kontak, setKontak] = useState('');
  const [pengirim, setPengirim] = useState('');
  const [acara, setAcara] = useState('');
  const [bundle, setBundle] = useState([defaultBundle]);

  return (
    <div>
      <Form
        layout='vertical'
      // onFinish={() => setVisible(false)}
      >
        <Form.Item
          name="nim"
          label="NIM"
        >
          <Input defaultValue='175150400111045' disabled />
        </Form.Item>
        <Form.Item
          name="nama"
          label="Nama"
        >
          <Input defaultValue='Puras Handharmahua' disabled />
        </Form.Item>
        <Form.Item
          name="kontak"
          label="Kontak"
        >
          <Input placeholder='WA/Id Line' defaultValue={kontak} value={kontak} onChange={e => setKontak(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="pengirim"
          label="Pengirim"
        >
          <Select
            placeholder='Pilih Pengirim'
            onChange={val => setPengirim(val)}
            value={pengirim}
            defaultValue={pengirim ? pengirim : null}
          >
            {listOption.listPengirim.map((val) => {
              return <Option value={val.value} > {val.text} </Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="acara"
          label="Acara"
        >
          <Input placeholder='Nama Acara' defaultValue={acara} value={acara} onChange={e => setAcara(e.target.value)} />
        </Form.Item>
        <Form.Item label='List Surat'>
          <Table
            columns={columns}
            dataSource={bundle}
            pagination={false}
            expandable={{ expandedRowRender }}
            // onRow={(val, idx, bundle, setBundle)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Kirim
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default PengajuanSurat;

