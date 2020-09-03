import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, Select } from 'antd';
import {
  EditFilled,
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const DetailPengajuan = ({ datas, setDataSurat, idx, dataSurat }) => {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState('');
  const [rev, setRev] = useState('');
  const [nosurat, setNosurat] = useState('');
  const [penerima, setPenerima] = useState('');

  useEffect(() => {
    setStatus(datas.status.status);
    setRev(datas.status.revisi);
    setNosurat(datas.nosurat);
    setPenerima(datas.penerima);
  }, [datas])

  return (
    <>
      <Button
        icon={<EditFilled />}
        shape='circle'
        size='small'
        onClick={() => setVisible(true)}
      />
      <Modal
        title="Detail Surat"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
        style={{ top: 20 }}
      >
        <div>
          <Form
            layout='vertical'
            onFinish={() => {
              setDataSurat(state => state.map((val, i) => {
                if (i === idx) {
                  return {
                    ...val,
                    status: {
                      ...val.status,
                      status: status,
                      revisi: rev
                    },
                    nosurat: nosurat,
                    penerima: penerima
                  }
                } else {
                  return val
                }
              }))
              setVisible(false)
            }}
          >
            <Form.Item
              name="nosurat"
              label="Nomor Surat"
              initialValue={nosurat}
            >
              <Input placeholder="Nomor Surat" value={nosurat} onChange={e => setNosurat(e.target.value)} />
            </Form.Item>
            <Form.Item
              name="penerima"
              label="Penerima"
              initialValue={penerima}
            >
              <Select
                placeholder='Pilih'
                onChange={val => setPenerima(val)}
                value={penerima}
              >
                <Option value="internal">Internal</Option>
                <Option value="eksternal">Eksternal</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              initialValue={status}
            >
              <Select
                placeholder='Pilih'
                onChange={val => setStatus(val)}
                value={status}
              >
                <Option value="Diterima">Terima</Option>
                <Option value="Ditolak">Tolak</Option>
                <Option value="Revisi">Revisi</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="revisi"
              label="Revisi"
              rules={status === 'Revisi' && [
                {
                  required: true,
                  message: 'Tuliskan revisi terlebih dahulu!',
                },
              ]}
            >
              <TextArea
                disabled={status !== 'Revisi'}
                value={rev}
                onChange={e => setRev(e.target.value)}
                placeholder='Tambahkan Revisi'
                autoSize={{ minRows: 4, maxRows: 8 }}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Save
                </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default DetailPengajuan;


