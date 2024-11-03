import type { FormProps, UploadFile, UploadProps } from 'antd';
import { Button, DatePicker, Form, Input, Select, Upload } from 'antd';
import dayjs from 'dayjs';
import { UserDataType } from '../../types/User';
import { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

type FieldType = {
  code: string;
  device: string;
  consentForm: UploadFile[];
  birth: string;
  gender: 'M' | 'F';
  etc?: string;
  note?: string;
  start?: string;
  end?: string;
};

interface Props {
  addUser: (user: UserDataType) => void;
  closeModal: () => void;
  selectedUser: UserDataType | null;
  isEditingMode: boolean;
  updateUser: (user: UserDataType) => void;
}

export default function UsersForm({
  addUser,
  closeModal,
  selectedUser,
  isEditingMode,
  updateUser,
}: Props) {
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleUploadChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);
  };

  const uploadProps = {
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange: handleUploadChange,
    multiple: true,
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (isEditingMode && selectedUser) {
      updateUser({
        key: selectedUser.key,
        code: values.code,
        birth: dayjs(values.birth).format('YYYY-MM-DD'),
        gender: values.gender,
        device: values.device,
        consentForm: fileList,
        survey: '미제출',
        step1: selectedUser.step1,
        step2: selectedUser.step2,
        step3: selectedUser.step3,
        etc: values.etc || '',
        note: values.note || '',
        start: values.start ? dayjs(values.start).format('YYYY-MM-DD') : '',
        end: values.end ? dayjs(values.end).format('YYYY-MM-DD') : '',
      });
    } else {
      addUser({
        key: Math.random().toString(),
        code: values.code,
        birth: dayjs(values.birth).format('YYYY-MM-DD'),
        gender: values.gender,
        device: values.device,
        consentForm: fileList,
        survey: '미제출',
        step1: '',
        step2: '',
        step3: '',
        etc: values.etc || '',
        note: values.note || '',
        start: values.start ? dayjs(values.start).format('YYYY-MM-DD') : '',
        end: values.end ? dayjs(values.end).format('YYYY-MM-DD') : '',
      });
    }
    closeModal();
    form.resetFields();
  };

  const initialValues =
    isEditingMode && selectedUser
      ? {
          code: selectedUser.code,
          birth: dayjs(selectedUser.birth),
          gender: selectedUser.gender,
          device: selectedUser.device,
          consentForm: selectedUser.consentForm,
          note: selectedUser.note,
          start: selectedUser.start ? dayjs(selectedUser.start) : undefined,
          end: selectedUser.end ? dayjs(selectedUser.end) : undefined,
        }
      : undefined;

  useEffect(() => {
    if (isEditingMode && selectedUser?.consentForm) {
      setFileList(selectedUser.consentForm);
    }
  }, [isEditingMode, selectedUser]);

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 16 }}
      wrapperCol={{ span: 16 }}
      style={{ width: '100%' }}
      onFinish={onFinish}
      //   onFinishFailed={onFinishFailed}
      layout="vertical"
      autoComplete="off"
      initialValues={initialValues}
    >
      <Form.Item<FieldType>
        label="코드"
        name="code"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        name="birth"
        label="생년월일"
        rules={[{ required: true }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item name="gender" label="성별" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          <Option value="M">남자</Option>
          <Option value="F">여자</Option>
        </Select>
      </Form.Item>

      <Form.Item<FieldType>
        label="기기"
        name="device"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="동의서" name="consentForm">
        <Upload {...uploadProps} fileList={fileList}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="기타" name="etc">
        <Input />
      </Form.Item>

      <Form.Item label="비고" name="note">
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item name="start" label="시작 날짜">
        <DatePicker />
      </Form.Item>

      <Form.Item name="end" label="종료 날짜">
        <DatePicker />
      </Form.Item>

      <div className="flex justify-end gap-5">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}
