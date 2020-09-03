import React, { useState } from 'react';
import styles from './daftarsurat.module.scss';
import { Table, Tag } from 'antd';

const dataSource = [
  {
    key: '1',
    nomor: 1,
    nosurat: 'faekdnfkadnfkdlnlfnalkenfkefdmfalkse',
    pemohon: 'Mike',
    jenis: 'undangan',
    penerima: 'eksternal',
    acara: 'PK2MABA',
    pengirim: 'psdm',
    link: '',
    status: {
      status: 'Diterima',
      tgl: '22-08-2020',
      revisi: '',
      admin: 'Puras Handharmahua'
    },
    expand: {
      kepada: 'Dummy',
      lampiran: 'Dummy',
      hal: 'Dummy',
      keterangan: 'Dummy',
    }
  },
  {
    key: '2',
    nomor: 2,
    nosurat: '',
    pemohon: 'John',
    jenis: 'permohonan',
    penerima: 'internal',
    acara: 'Hology',
    link: '',
    pengirim: 'k2p',
    status: {
      status: 'Revisi',
      tgl: '22-08-2020',
      revisi: " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  ",
      admin: 'Puras Handharmahua'
    },
    expand: {
      kepada: 'Dummy',
      lampiran: 'Dummy',
      hal: 'Dummy',
      keterangan: 'Dummy',
    }
  },
];

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

const DaftarSurat = () => {
  const [data, setData] = useState(dataSource)

  const columns = [
    {
      title: 'No.',
      dataIndex: 'nomor',
      key: 'no',
      width: 75,
      fixed: 'left'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      fixed: 'left',
      render: record => <Status val={record.status} tgl={record.tgl} />
    },
    {
      title: 'No Surat',
      dataIndex: 'nosurat',
      key: 'nosurat',
      fixed: 'left',
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

  const Status = ({ val, tgl }) => {
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

  return (
    <div>
      <p><b>Admin/User</b></p>
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

