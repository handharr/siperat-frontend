import React, { useState } from 'react'; // import React
import { Modal, Button, Form, Select, Input } from 'antd'; // import antd components
import { listOption } from '../../../../../../configs'; // import configs
import styles from './bundlesurat.module.scss'; // import scss stylesheet

const { Option } = Select; // destructuring Select antd component


/**
 * display form to edit temporary of each letters
 * 
 * @param {object} param1 
 */
const FormBundle = ({ record, idx, setBundle, setVisible }) => {

  /**
   * handle changes of state
   * 
   * @param {any} key 
   * @param {any} val 
   */

  console.log('Form bundle renderet')

  return (
    <div className={styles.bundleContainer}>
      <div className={styles.bundleLeft}>
        <div>
          <span>Surat {idx + 1}</span>
          <br /><br />
        </div>
        <Form
          onFinish={value => {
            setBundle(state => state.map((val, i) => {
              return i === idx ? value : val
            }))
            console.log('form bundle', value)
            setVisible(false)
          }}
        >
          <Form.Item
            name='jenis'
            initialValue={record.jenis}
            rules={[
              {
                required: true,
                message: 'Data tidak boleh kosong!'
              },
            ]}
          >
            <Select placeholder='Jenis Surat' >
              {listOption.listJenisSurat.map(val => <Option value={val.value} > {val.text} </Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            name='penerima'
            initialValue={record.penerima}
            rules={[
              {
                required: true,
                message: 'Data tidak boleh kosong!'
              },
            ]}
          >
            <Select placeholder='Penerima Surat'>
              {[{ value: 'internal', text: 'Internal' }, { value: 'eksternal', text: 'Eksternal' }].map(val => <Option value={val.value} > {val.text} </Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            name='namaPenerima'
            initialValue={record.namaPenerima}
            rules={[
              {
                required: true,
                message: 'Data tidak boleh kosong!'
              },
            ]}
          >
            <Input placeholder='Nama Penerima' />
          </Form.Item>
          <Form.Item
            name='hal'
            initialValue={record.hal}
            rules={[
              {
                required: true,
                message: 'Data tidak boleh kosong!'
              },
            ]}
          >
            <Input placeholder='Perihal' />
          </Form.Item>
          <Form.Item
            name='lampiran'
            initialValue={record.lampiran}
            rules={[
              {
                required: true,
                message: 'Data tidak boleh kosong!'
              },
            ]}
          >
            <Input placeholder='Lampiran' />
          </Form.Item>
          <Form.Item
            name='keterangan'
            initialValue={record.keterangan}
            rules={[
              {
                required: true,
                message: 'Data tidak boleh kosong!'
              },
            ]}
          >
            <Input placeholder='Keterangan' />
          </Form.Item>
          <Form.Item
            name='link'
            initialValue={record.link}
            rules={[
              {
                required: true,
                message: 'Data tidak boleh kosong!'
              },
            ]}
          >
            <Input placeholder='Link File' />
          </Form.Item>
          <Form.Item>
            <div className={styles.bundleRight}>
              <Button type='primary' htmlType='submit'>
                Save
              </Button>
              <Button
                onClick={() => setVisible(false)}
              >
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

/**
 * display modal for editing each data
 * 
 * @param {object} param1 
 */

const BundleSurat = ({ setBundle, ...rest }) => {
  const [visible, setVisible] = useState(false) // modal visibility

  console.log('Bundle Surat Rendered');

  return (
    <>
      <Button type='link' size={window.innerWidth < 768 && 'small'} onClick={() => setVisible(true)}>Edit</Button>
      <Modal
        title="Detail Surat"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
        style={{ top: 20 }}
      >
        <FormBundle
          {...rest}
          setBundle={setBundle}
          setVisible={setVisible}
        />
      </Modal>
    </>
  )
}

export default BundleSurat;


