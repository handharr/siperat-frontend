import React from 'react';
import { Table, Tag, Button } from 'antd';
import styles from './daftarpengajuan.module.scss';
import {
  DeleteFilled
} from '@ant-design/icons';
import DetailPengajuan from '../detail-pengajuan';

const dataSource = [
  {
    key: '1',
    nomor: 1,
    status: {
      status: 'Diterima',
      tgl: '22-08-2020',
      revisi: '',
      admin : 'Puras Handharmahua'
    },
    nosurat: 'faekdnfkadnfkdlnlfnalkenfkefdmfalkse',
    pemohon: 'Mike',
    jenis: 'undangan',
    penerima: 'eksternal',
    acara: 'PK2MABA',
    pengirim: 'psdm',
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
    status: {
      status: 'Revisi',
      tgl: '22-08-2020'
    },
    nosurat: 'faekdnfkadnfkdlnlfnalkenfkefdmfalkse',
    pemohon: 'John',
    jenis: 'permohonan',
    penerima: 'internal',
    acara: 'Hology',
    pengirim: 'k2p',
    expand: {
      kepada: 'Dummy',
      lampiran: 'Dummy',
      hal: 'Dummy',
      keterangan: 'Dummy',
    }
  },
];

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
    render: data => <Status val={data.status} tgl={data.tgl} />
  },
  {
    title: 'No Surat',
    dataIndex: 'nosurat',
    key: 'nosurat',
    fixed: 'left',
    width: 300
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
    render : text => text[0].toUpperCase() + text.slice(1),
    width: 150
  },
  {
    title: 'Penerima',
    dataIndex: 'penerima',
    key: 'penerima',
    render : text => text[0].toUpperCase() + text.slice(1),
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
    render : text => text.toUpperCase(),
    width: 100
  },
  {
    title: 'Action',
    key: 'operation',
    width: 100,
    fixed: 'right',
    render: test => {
      return (
        <div className={styles.actionField}>
          <DetailPengajuan datas={test} />
          <Button
            icon={<DeleteFilled />}
            shape='circle'
            size='small'
            danger
          />
        </div>
      )
    }
  }
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

const expandedRowRender = ({ expand }) => {
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
        </tbody>
      </table>
    </div>
  )
}

const DaftarPengajuan = () => {
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        expandable={{ expandedRowRender }}
        scroll={{ x: 1275 }}
      />
    </div>
  )
}

export default DaftarPengajuan;


