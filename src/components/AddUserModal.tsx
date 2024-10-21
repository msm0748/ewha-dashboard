import type { DatePickerProps, FormProps } from 'antd';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import dayjs from 'dayjs';
import { UserDataType } from '../pages/Admin/UsersPage';
const { TextArea } = Input;
const { Option } = Select;

type FieldType = {
  code: string;
  machinery: string;
  birth: string;
  gender: 'M' | 'F';
  note?: string;
  start?: string;
  end?: string;
};

interface Props {
  open: boolean;
  onCancel: () => void;
  addUser: (user: UserDataType) => void;
}

export default function AddUserModal({ open, onCancel, addUser }: Props) {
  const [form] = Form.useForm();
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    // console.log(, 'values');
    addUser({
      key: Math.random().toString(),
      code: values.code,
      birth: dayjs(values.birth).format('YYYY-MM-DD'),
      gender: values.gender,
      machinery: values.machinery,
      consent: '',
      survey: '',
      step1: '',
      step2: '',
      step3: '',
      etc: values.note || '',
      note: values.note || '',
      start: values.start ? dayjs(values.start).format('YYYY-MM-DD') : '',
      end: values.end ? dayjs(values.end).format('YYYY-MM-DD') : '',
    });
    onCancel();
    form.resetFields();
  };

  return (
    <div>
      <Modal
        title="회원 등록"
        centered
        open={open}
        onCancel={onCancel}
        width={800}
        footer={null} // 모달 버튼 제거
      >
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
            name="machinery"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
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
      </Modal>
    </div>
  );
}
