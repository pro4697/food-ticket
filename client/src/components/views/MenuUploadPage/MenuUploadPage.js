import React, { useState } from 'react';
import axios from 'axios';
import { Typography, Button, Form, message, Input, Icon, Select } from 'antd';
import Dropzone from 'react-dropzone';
import { SERVER } from '../../Config.js';

const { Title } = Typography;

const SectionOptions = [
  { value: 1, label: '1F 구내식당' },
  { value: 2, label: 'B1 구내식당' },
  { value: 3, label: '1F Starbucks' },
];

function MenuUploadPage(props) {
  const [Name, setName] = useState('');
  const [Section, setSection] = useState(1);
  const [Price, setPrice] = useState('');
  const [File, setFile] = useState(null);
  const [Preview, setPreview] = useState('');

  const onPriceChange = (e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      setPrice(value);
    }
  };

  const onSectionChange = (value) => {
    setSection(value);
  };

  const onDrop = (files) => {
    if (files[0] === undefined) {
      alert('3MB 이하의 파일만 업로드 할 수 있습니다.');
      return;
    }
    setName(files[0].name.split('.')[0]);
    setFile(files[0]);
    setPreview(URL.createObjectURL(files[0]));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (File === null) {
      alert('사진을 업로드 해주세요');
      return;
    }
    if (Price < 500) {
      alert('음식 가격은 500원 이상이어야 합니다');
      setPrice('');
      return;
    }

    let formData = new FormData();
    formData.append('file', File);

    axios.post(`${SERVER}/api/menus/uploadfiles`, formData).then((response) => {
      if (response.data.success) {
        let variable = {
          name: Name.split('.')[0],
          url: response.data.url,
          price: Price,
          section: Section,
        };

        axios
          .post(`${SERVER}/api/menus/savefiles`, variable)
          .then((response) => {
            if (response.data.success) {
              message.success('업로드 완료.');
              setTimeout(() => {
                props.history.push('/');
              }, 1500);
            }
          });
      } else {
        alert('업로드를 실패.');
      }
    });
  };

  return (
    <div style={{ maxWidth: '320px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Menu</Title>
      </div>

      <Form required onSubmit={onSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Dropzone
            onDrop={onDrop}
            accept='image/*'
            multiple={false}
            maxSize={3072000}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: '320px',
                  height: '180px',
                  border: '1px solid lightgray',
                  display: 'flex',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {Preview && (
                  <img
                    src={Preview}
                    alt='thumbnail'
                    style={{
                      height: '100%',
                    }}
                  />
                )}

                {!Preview && <Icon type='plus' style={{ fontSize: '3rem' }} />}
              </div>
            )}
          </Dropzone>
        </div>
        <br />
        <br />
        <div
          style={{
            width: '320px',
            display: 'block',
            margin: '0',
          }}
        >
          <Input
            onChange={onPriceChange}
            placeholder='File name'
            value={Name}
            style={{ width: '100%', marginBottom: '30px' }}
            disabled
          />

          <Input
            onChange={onPriceChange}
            placeholder='Only number'
            prefix='₩'
            suffix='원'
            maxLength={5}
            value={Price}
            style={{ width: '100%', marginBottom: '30px' }}
          />

          <Select
            defaultValue={SectionOptions[0].label}
            onChange={onSectionChange}
            style={{ width: '100%', marginBottom: '30px' }}
          >
            {SectionOptions.map((item, idx) => (
              <Select.Option value={item.value} key={idx}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
          <Button type='primary' onClick={onSubmit} style={{ width: '100%' }}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default MenuUploadPage;
