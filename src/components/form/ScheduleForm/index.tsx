import { ClockCircleOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  InputRef,
  Switch,
  TimePicker,
} from 'antd';
import Row from './Row';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { EventInput } from '@fullcalendar/core/index.js';
import { SelectedDate } from '../../../types/Calendar';

type FieldType = {
  title: string;
  startDate: string;
  startTime?: string;
  endDate: string;
  endTime?: string;
  allDay: boolean;
};

interface Props {
  closeModal: () => void;
  addEvent: (event: EventInput) => void;
  selectedDate: SelectedDate;
}

const format = 'HH:mm';

export default function ScheduleForm({
  closeModal,
  addEvent,
  selectedDate,
}: Props) {
  const [allDay, setAllDay] = useState(true);
  const [form] = Form.useForm();
  const titleInputRef = useRef<InputRef>(null);

  /** 주어진 시간을 가장 가까운 10분 단위로 변환하는 함수 */
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
    console.log('time', dayjs(values.startTime).format('HH:mm'));
    addEvent({
      title: values.title,
      start: allDay
        ? dayjs(values.startDate).format('YYYY-MM-DD')
        : `${dayjs(values.startDate).format('YYYY-MM-DD')}T${dayjs(
            values.startTime
          ).format('HH:mm')}`,
      end: allDay
        ? dayjs(values.endDate).add(1, 'day').format('YYYY-MM-DD') // 캘린더 종료일이 하루 일찍 표시되는 문제 해결
        : `${dayjs(values.endDate).format('YYYY-MM-DD')}T${dayjs(
            values.endTime
          ).format('HH:mm')}`,
      allDay,
    });
    closeModal();
    form.resetFields();
  };

  /** enter 눌려서 폼 제출하기 막기 */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Enter 키 눌림 동작을 막음
    }
  };

  useEffect(() => {
    titleInputRef.current?.focus(); // 렌더시 제목 입력창에 포커스
  }, []);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      //   onFinishFailed={onFinishFailed}
      layout="vertical"
      autoComplete="off"
      initialValues={{
        startDate: dayjs(selectedDate.startDate),
        startTime: roundToNearestTenMinutes(dayjs()),
        endDate: dayjs(selectedDate.endDate).subtract(1, 'day'), // 캘린더 종료일이 하루 늦게 표시되는 문제 해결
        endTime: roundToNearestTenMinutes(dayjs().add(1, 'hour')), // 1시간 뒤
        allDay,
      }}
      onKeyDown={handleKeyDown}
    >
      <Row>
        <Form.Item<FieldType>
          name="title"
          className="mb-0"
          rules={[{ required: true, message: '제목을 입력해 주세요.' }]}
        >
          <Input
            placeholder="제목을 입력해 주세요."
            ref={titleInputRef}
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
            <Switch onChange={onChangeAllDay} defaultChecked />
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
