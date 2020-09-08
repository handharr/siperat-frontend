import React, { useState, useCallback } from 'react' // import React
import { Modal, Button, Form, Input, Select, Tooltip } from 'antd'; // import antd components
import {
  EditFilled,
} from '@ant-design/icons'; // import antd icon components

const { Option } = Select; // destructuring antd Select Component
const { TextArea } = Input; // destructuring antd Input Component

/**
 * modal display details of each data and form to edit it
 * 
 * @param {object} param1
 */
const DetailPengajuan = React.memo(({ datas: { nosurat, status, penerima }, setDataSurat, idx }) => {
  const [visible, setVisible] = useState(false); // modal visibility
  const [statusData, setStatusData] = useState(''); // status data

  const send = useCallback(value => {
    setDataSurat(state => state.map((val, i) => {
      if (i === idx) {
        return {
          ...val,
          status: {
            ...val.status,
            status: value.status,
            revisi: value.revisi
          },
          nosurat: value.nosurat,
          penerima: value.penerima
        }
      } else {
        return val
      }
    }));
    setVisible(false);
    // console.log('detail pengajuan', value)
  }, [setDataSurat, idx]);

  console.log('Detail Pengajuan Rendered');

  return (
    <>
      <Tooltip placement='top' title='Lihat detail surat'>
        <Button
          icon={<EditFilled />}
          shape='circle'
          size='small'
          onClick={() => setVisible(true)}
        />
      </Tooltip>
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
            onFinish={send}
          >
            <Form.Item
              name="nosurat"
              label="Nomor Surat"
              initialValue={nosurat}
            >
              <Input
                placeholder="Nomor Surat"
              />
            </Form.Item>
            <Form.Item
              name="penerima"
              label="Penerima"
              initialValue={penerima}
            >
              <Select
                placeholder='Pilih'
              >
                <Option value="internal">Internal</Option>
                <Option value="eksternal">Eksternal</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              initialValue={status.status}
            >
              <Select
                placeholder='Pilih'
                onChange={val => setStatusData(val)}
              >
                <Option value="Diterima">Terima</Option>
                <Option value="Ditolak">Tolak</Option>
                <Option value="Revisi">Revisi</Option>
                <Option value="Proses">Proses</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="revisi"
              label="Revisi"
              initialValue={status.revisi}
              rules={statusData === 'Revisi' && [
                {
                  required: true,
                  message: 'Tuliskan revisi terlebih dahulu!',
                },
              ]}
            >
              <TextArea
                disabled={statusData !== 'Revisi'}
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
})

export default DetailPengajuan;


