import { ClockCircleOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
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
import { SelectedDate, UpdateEventArg } from '../../../types/Calendar';
import { roundToNearestTenMinutes } from '../../../utils/roundToNearestTenMinutes';
import { useModal } from '../../../hooks/useModal';
import DeleteConfirmModal from '../../modal/DeleteConfirmModal';

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
  selectedEvent: EventInput | null;
  isEditingMode: boolean;
  initialAllDay: boolean;
  updateEvent: (event: UpdateEventArg) => void;
  deleteEvent: (id: string) => void;
}

const timePickerFormat = 'HH:mm';

export default function ScheduleForm({
  closeModal,
  addEvent,
  selectedDate,
  selectedEvent,
  isEditingMode,
  updateEvent,
  initialAllDay,
  deleteEvent,
}: Props) {
  const [allDay, setAllDay] = useState(initialAllDay);
  const [form] = Form.useForm();
  const titleInputRef = useRef<InputRef>(null);

  const {
    isOpen: isDeleteModalOpen,
    closeModal: closeDeleteModal,
    openModal: openDeleteModal,
  } = useModal();

  const formatDate = (date: string, time?: string) => {
    return `${dayjs(date).format('YYYY-MM-DD')}T${dayjs(time).format('HH:mm')}`;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    if (isEditingMode && selectedEvent) {
      updateEvent({
        id: selectedEvent.id!,
        title: values.title,
        start: allDay
          ? dayjs(values.startDate).format('YYYY-MM-DD')
          : formatDate(values.startDate, values.startTime),
        end: allDay
          ? dayjs(values.endDate).add(1, 'day').format('YYYY-MM-DD') // 캘린더 종료일이 하루 일찍 표시되는 문제 해결
          : formatDate(values.endDate, values.endTime),
        allDay,
      });
    } else {
      addEvent({
        id: uuidv4(),
        title: values.title,
        start: allDay
          ? dayjs(values.startDate).format('YYYY-MM-DD')
          : formatDate(values.startDate, values.startTime),
        end: allDay
          ? dayjs(values.endDate).add(1, 'day').format('YYYY-MM-DD') // 캘린더 종료일이 하루 일찍 표시되는 문제 해결
          : formatDate(values.endDate, values.endTime),
        allDay,
      });
    }
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

  const handleDeleteEvent = () => {
    deleteEvent(selectedEvent!.id!);
    closeModal();
  };

  const initialValues =
    isEditingMode && selectedEvent
      ? {
          title: selectedEvent.title,
          startDate: dayjs(selectedEvent.start as string),
          // allDay가 true일 경우 startTime이 없으므로 현재 시간 설정
          startTime: allDay
            ? roundToNearestTenMinutes(dayjs())
            : dayjs(selectedEvent.start as string),
          endDate: allDay
            ? dayjs(selectedEvent.end as string).subtract(1, 'day') // 캘린더 종료일이 하루 늦게 표시되는 문제 해결,
            : dayjs(selectedEvent.end as string),
          endTime: allDay
            ? // allDay가 true일 경우 startTime이 없으므로 현재 시간 설정
              roundToNearestTenMinutes(dayjs().add(1, 'hour'))
            : dayjs(selectedEvent.end as string),
          allDay,
        }
      : {
          startDate: dayjs(selectedDate.startDate),
          startTime: dayjs(selectedDate.startDate),
          endDate: allDay
            ? dayjs(selectedDate.endDate).subtract(1, 'day') // 캘린더 종료일이 하루 늦게 표시되는 문제 해결
            : dayjs(selectedDate.endDate),
          endTime: dayjs(selectedDate.endDate),
          allDay,
        };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
        initialValues={initialValues}
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
                    format={timePickerFormat}
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
                    format={timePickerFormat}
                    minuteStep={10}
                  />
                </Form.Item>
              )}
            </div>
          </div>
        </Row>
        <Row>
          <Form.Item>
            <div className="flex items-center gap-2">
              <Form.Item<FieldType>
                name="allDay"
                noStyle
                valuePropName="checked"
              >
                <Switch onChange={setAllDay} checked={allDay} />
              </Form.Item>
              <span>종일</span>
            </div>
          </Form.Item>
        </Row>

        <div className="flex gap-5">
          {selectedEvent && isEditingMode && (
            <Button onClick={openDeleteModal}>삭제</Button>
          )}
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        onConfirm={handleDeleteEvent}
        title="일정 삭제"
      />
    </>
  );
}
