import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Typography, Button, Form, message, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import { SERVER } from '../../Config';
import { sectionName } from '../LandingPage/LandingPage';

const { Title } = Typography;

const SectionOptions = [
  { value: 1, label: sectionName[0] },
  { value: 2, label: sectionName[1] },
  { value: 3, label: sectionName[2] },
];

const Upload = styled.div`
  max-width: 320px;
  margin: 2rem auto;
  text-align: center;
`;

const DropBox = styled.div`
  width: 320px;
  height: 180px;
  border: 1px solid lightgray;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px !important;
  border-radius: 4px !important;
  user-select: none;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  & .ant-select-selector {
    border-radius: 4px !important;
  }
  margin-bottom: 30px !important;
  text-align: left;
`;

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
    <Upload>
      <Title level={2}>Upload Menu</Title>
      <Form required onSubmit={onSubmit}>
        <Dropzone
          onDrop={onDrop}
          accept='image/*'
          multiple={false}
          maxSize={3072000}
        >
          {({ getRootProps, getInputProps }) => (
            <DropBox {...getRootProps()}>
              <input {...getInputProps()} />
              {Preview && (
                <img src={Preview} alt='' style={{ height: '100%' }} />
              )}
              {!Preview && <PlusOutlined style={{ fontSize: '3rem' }} />}
            </DropBox>
          )}
        </Dropzone>
        <StyledInput placeholder='File name' value={Name} disabled />
        <StyledInput
          onChange={onPriceChange}
          placeholder='Only number'
          prefix='₩'
          // suffix='원'
          maxLength={5}
          value={Price}
        />
        <StyledSelect
          defaultValue={SectionOptions[0].label}
          onChange={onSectionChange}
        >
          {SectionOptions.map((item, idx) => (
            <Select.Option value={item.value} key={idx}>
              {item.label}
            </Select.Option>
          ))}
        </StyledSelect>
        <Button type='primary' onClick={onSubmit} style={{ width: '100%' }}>
          Submit
        </Button>
      </Form>
    </Upload>
  );
}

export default MenuUploadPage;
