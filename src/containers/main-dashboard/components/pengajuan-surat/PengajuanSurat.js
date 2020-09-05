import React, { useState } from 'react'; // import React
import styles from './pengajuansurat.module.scss'; // import scss stylesheet
import { Form, Select, Input, Button, Table, message, Tooltip } from 'antd'; // import antd components
import { listOption } from '../../../../configs'; //import configs
import {
  PlusOutlined
} from '@ant-design/icons'; //import antd icon components
import BundleSurat from './components/bundle-surat/BundleSurat'; // import local components

const { Option } = Select; // destructuring antd Select Component

// default value of one data
const defaultBundle = {
  jenis: undefined,
  penerima: undefined,
  namaPenerima: '',
  hal: '',
  lampiran: '',
  keterangan: '',
  link: ''
}

/**
 * component to replace expanded row rendering display some of data
 * 
 * @param {object} param 
 */
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

const tableColumns = (setBundle) => {
  return [
    {
      key: 'jenis',
      title: 'Jenis',
      dataIndex: 'jenis',
      width:150
    },
    {
      key: 'penerima',
      title: 'Penerima',
      dataIndex: 'penerima',
      width: 150
    },
    {
      key: 'namaPenerima',
      title: 'Nama Penerima',
      dataIndex: 'namaPenerima',
      width: 150
    },
    {
      key: 'link',
      title: 'Link',
      dataIndex: 'link',
      width : 300
    },
    {
      key: 'action',
      title: window.innerWidth > 768 ? 'Action' : 'Act',
      fixed: 'right',
      width: window.innerWidth > 768 ? 100 : 50,
      render: (t, record, index) => {
        return (
          <>
            <BundleSurat record={record} idx={index} setBundle={setBundle} />
            <Button
              type='link'
              danger
              size={window.innerWidth < 768 && 'small'}
              onClick={() => { setBundle(state => state.filter((val, i) => i !== index)) }}
            >
              Delete
            </Button>
          </>
        )
      }
    }
  ];
}

/**
 * form and table for letter submission
 */
const PengajuanSurat = () => {
  const [bundle, setBundle] = useState([]); // list of surat -> array of object
  const [toolVisible, setToolVisible] = useState(false);

  console.log('Pengajuan Surat Rendered');

  return (
    <div>
      <p><b>User</b></p>
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
            setToolVisible(true)
            message.error('Paling tidak masukkan 1 surat!!');
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
          initialValue=''
          rules={[
            {
              required: true,
              message: 'Data tidak boleh kosong!'
            },
          ]}
        >
          <Input placeholder='WA/Id Line' />
        </Form.Item>
        <Form.Item
          name="pengirim"
          label="Pengirim"
          initialValue={undefined}
          rules={[
            {
              required: true,
              message: 'Data tidak boleh kosong!'
            },
          ]}
        >
          <Select
            placeholder='Pilih Pengirim'
          >
            {listOption.listPengirim.map((val) => {
              return <Option value={val.value} > {val.text} </Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="acara"
          label="Acara"
          initialValue=''
          rules={[
            {
              required: true,
              message: 'Data tidak boleh kosong!'
            },
          ]}
        >
          <Input placeholder='Nama Acara' />
        </Form.Item>
        <Form.Item label='List Surat'>
          <div className={styles.divTambahSurat}>
            <Tooltip title='Tambah Surat' visible={toolVisible} color='red' >
              <Button
                type='primary'
                icon={<PlusOutlined />}
                onClick={() => {
                  setBundle(state => [...state, defaultBundle])
                  setToolVisible(false)
                }}
              >
                Tambah Surat
            </Button>
            </Tooltip>
            <br /><br />
          </div>
          <Table
            columns={tableColumns(setBundle)}
            dataSource={bundle}
            pagination={false}
            expandable={{ expandedRowRender }}
            scroll={window.innerWidth < 768 && { x: 1100 }}
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

