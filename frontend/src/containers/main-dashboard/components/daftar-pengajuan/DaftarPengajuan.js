import React, { useState } from 'react'; // import react
import { Table, Tag, Button, Tooltip } from 'antd'; // import antd components
import styles from './daftarpengajuan.module.scss'; //import scss style
import {
  DeleteFilled,
  SnippetsFilled
} from '@ant-design/icons'; // import antd icon components
import DetailPengajuan from '../detail-pengajuan/DetailPengajuan'; // import local component
import { dummyData, listOption } from '../../../../configs'; // import configs

/**
 * return status and date to replace Status cell rendering
 * 
 * @param {string} val 
 * @param {string} tgl 
 */
const status = (val, tgl) => {
  let color = '';

  switch (val) {
    case 'Diterima':
      color = 'success';
      break;
    case 'Ditolak':
      color = 'error';
      break;
    case 'Revisi':
      color = 'warning';
      break;
    case 'Proses':
      color = 'processing'
      break;
    default:
      color = ''
  }

  return (
    <div className={styles.status}>
      <Tag color={color}>{val}</Tag>
      <p> {tgl} </p>
    </div>
  )
}

/**
 * component to replace expanded row rendering display some of data
 * 
 * @param {object} param1 destructuring
 */
const expandedRowRender = ({ expand, status }) => {
  return (
    <div className={styles.expandedWrapper}>
      <table>
        <colgroup>
          <col span='1' />
          <col span='1' />
        </colgroup>
        <tbody>
          <tr>
            <td>Kepada</td>
            <td>: {expand.kepada}</td>
          </tr>
          <tr>
            <td>Lampiran</td>
            <td>: {expand.lampiran}</td>
          </tr>
          <tr>
            <td>Hal</td>
            <td>: {expand.hal}</td>
          </tr>
          <tr>
            <td>Keterangan</td>
            <td>: {expand.keterangan}</td>
          </tr>
          <tr>
            <td>Link</td>
            <td>: {expand.link}</td>
          </tr>
          <tr>
            <td valign='top' >Revisi</td>
            <td>: {status.revisi}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

/**
 * passing parameter to column definition
 * 
 * @param {function} setDataSurat setState function
 */
const tableColumns = (setDataSurat) => {
  return [
    {
      title: 'No.',
      dataIndex: 'nomor',
      key: 'no',
      width: 75,
      fixed: window.innerWidth > 768 ? 'left' : null,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      fixed: window.innerWidth > 768 ? 'left' : null,
      render: record => status(record.status, record.tgl),
      // render: record => <statusSurat val={record.status} tgl={record.tgl} />,
      onFilter: (val, { status }) => val === status.status,
      filters: [
        { value: 'Diterima', text: 'Diterima' },
        { value: 'Ditolak', text: 'Ditolak' },
        { value: 'Revisi', text: 'Revisi' },
        { value: 'Proses', text: 'Proses' },
      ],
    },
    {
      title: 'No Surat',
      dataIndex: 'nosurat',
      key: 'nosurat',
      fixed: window.innerWidth > 768 ? 'left' : null,
      width: 300,
      render: text => text === '' ? <b>--Belum Disetujui--</b> : text
    },
    {
      title: 'Pemohon',
      dataIndex: 'pemohon',
      key: 'pemohon',
      width: 200
    },
    {
      title: 'Jenis',
      dataIndex: 'jenis',
      key: 'jenis',
      render: text => text[0].toUpperCase() + text.slice(1),
      width: 150,
      filters: listOption.listJenisSurat
    },
    {
      title: 'Penerima',
      dataIndex: 'penerima',
      key: 'penerima',
      render: text => text[0].toUpperCase() + text.slice(1),
      width: 100,
      filters: [
        { value: 'internal', text: 'Internal' },
        { value: 'eksternal', text: 'Eksternal' },
      ],
    },
    {
      title: 'Acara',
      dataIndex: 'acara',
      key: 'acara',
      width: 150
    },
    {
      title: 'Pengirim',
      dataIndex: 'pengirim',
      key: 'pengirim',
      render: text => text.toUpperCase(),
      width: 100,
      filters: listOption.listPengirim
    },
    {
      title: window.innerWidth > 768 ? 'Action' : 'Act',
      key: 'operation',
      width: window.innerWidth > 768 ? 100 : 50,
      fixed: 'right',
      align: 'center',
      render: (t, record, index) => {
        return (
          <div className={styles.actionField}>
            <DetailPengajuan
              datas={record}
              setDataSurat={setDataSurat}
              idx={index}
            />
            <Tooltip placement='top' title='Hapus Surat' >
              <Button
                icon={<DeleteFilled />}
                shape='circle'
                size='small'
                danger
                onClick={() => { setDataSurat(state => state.filter((val, i) => i !== index)) }}
              />
            </Tooltip>
            <Tooltip placement='bottom' title='Go to file' >
              <Button
                shape='circle'
                size='small'
              >
                <a href={record.link}>
                  <SnippetsFilled />
                </a>
              </Button>
            </Tooltip>
          </div>
        )
      }
    }
  ];
}

/**
 * component that return daftar pengajuan table
 */
const DaftarPengajuan = () => {
  const [dataSurat, setDataSurat] = useState(dummyData); // data -> array of object

  console.log('Daftar Pengajuan Rendered');

  return (
    <div>
      <p><b>Admin Only</b></p>
      <Table
        dataSource={dataSurat}
        columns={tableColumns(setDataSurat)}
        expandable={{ expandedRowRender }}
        scroll={{ x: 1500 }}
      />
    </div>
  )
}

export default DaftarPengajuan;


