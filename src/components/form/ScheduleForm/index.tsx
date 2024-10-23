import { ClockCircleOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  Switch,
  TimePicker,
} from 'antd';
import Row from './Row';
import { useState } from 'react';
import dayjs from 'dayjs';

type FieldType = {
  title: string;
  startDate: string;
  startTime?: string;
  endDate: string;
  endTime?: string;
  allDay: boolean;
};

const format = 'HH:mm';

export default function ScheduleForm() {
  const [allDay, setAllDay] = useState(false);
  const [form] = Form.useForm();

  // 주어진 시간을 가장 가까운 10분 단위로 변환하는 함수
  const roundToNearestTenMinutes = (time: dayjs.Dayjs) => {
    const minute = time.minute(); // 주어진 시간의 분 가져오기
    const roundedMinute = Math.ceil(minute / 10) * 10; // 10분 단위로 올림

    return time.minute(roundedMinute).second(0); // 분과 초를 조정한 새로운 객체 반환
  };

  const onChangeAllDay = (checked: boolean) => {
    setAllDay(checked);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };
  return (
    <Form
      form={form}
      onFinish={onFinish}
      //   onFinishFailed={onFinishFailed}
      layout="vertical"
      autoComplete="off"
      initialValues={{
        startDate: dayjs(),
        startTime: roundToNearestTenMinutes(dayjs()),
        endDate: dayjs(),
        endTime: roundToNearestTenMinutes(dayjs().add(1, 'hour')), // 1시간 뒤
        allDay: false,
      }}
    >
      <Row>
        <Form.Item<FieldType>
          name="title"
          className="mb-0"
          rules={[{ required: true, message: '제목을 입력해 주세요.' }]}
        >
          <Input
            placeholder="제목을 입력해 주세요."
            style={{
              border: 'none',
              borderBottom: '1px solid #d9d9d9',
              borderRadius: 0,
            }}
            className="focus:shadow-none"
            size="large"
          />
        </Form.Item>
      </Row>

      <Row icon={<ClockCircleOutlined />}>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <Form.Item<FieldType> name="startDate" className="mb-0">
              <DatePicker allowClear={false} />
            </Form.Item>
            {!allDay && (
              <Form.Item<FieldType> name="startTime" className="mb-0">
                <TimePicker
                  format={format}
                  minuteStep={10}
                  allowClear={false}
                />
              </Form.Item>
            )}
          </div>
          <div>~</div>
          <div className="flex gap-2">
            <Form.Item<FieldType> name="endDate" className="mb-0">
              <DatePicker allowClear={false} />
            </Form.Item>
            {!allDay && (
              <Form.Item<FieldType> name="endTime" className="mb-0">
                <TimePicker
                  allowClear={false}
                  format={format}
                  minuteStep={10}
                />
              </Form.Item>
            )}
          </div>
        </div>
      </Row>
      <Row>
        <Form.Item<FieldType>
          name="allDay"
          className="mb-0"
          valuePropName="checked"
        >
          <div className="flex items-center gap-2">
            <span>종일</span>
            <Switch onChange={onChangeAllDay} />
          </div>
        </Form.Item>
      </Row>

      <div className="flex justify-end gap-5">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}
