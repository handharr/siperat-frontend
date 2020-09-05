import React, { useState } from 'react'; // import React
import styles from './daftarsurat.module.scss'; // import scss stylesheet
import { Table, Tag } from 'antd'; // import antd components
import { dummyData } from '../../../../configs'; // import configs

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
 * return status and date to replace Status cell rendering
 * 
 * @param {string} val 
 * @param {string} tgl 
 */
const statusSurat = (val, tgl) => {
  let color = '';

  if (val === 'Diterima') {
    color = 'success'
  } else if (val === 'Ditolak') {
    color = 'error'
  } else {
    color = 'warning'
  }

  return (
    <div className={styles.status}>
      <Tag color={color}>{val}</Tag>
      <p> {tgl} </p>
    </div>
  )
}

/**
 * column definition
 */
const columns = [
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
    render: record => statusSurat(record.status, record.tgl)
  },
  {
    title: 'No Surat',
    dataIndex: 'nosurat',
    key: 'nosurat',
    fixed: window.innerWidth > 768 ? 'left' : null,
    width: 300,
    render: text => text === '' ? <b>--Belum Disetujui--</b> : text,
  },
  {
    title: 'Jenis',
    dataIndex: 'jenis',
    key: 'jenis',
    render: text => text[0].toUpperCase() + text.slice(1),
    width: 150
  },
  {
    title: 'Penerima',
    dataIndex: 'penerima',
    key: 'penerima',
    render: text => text[0].toUpperCase() + text.slice(1),
    width: 100
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
    width: 100
  },
];

/**
 * component that return daftar surat table
 */
const DaftarSurat = () => {
  const [data,] = useState(dummyData) // data -> array of object

  console.log('Daftar Surat Rendered');

  return (
    <div>
      <p><b>User</b></p>
      <Table
        dataSource={data}
        columns={columns}
        expandable={{ expandedRowRender }}
        scroll={{ x: 1275 }}
      />
    </div>
  )
}

export default DaftarSurat;

