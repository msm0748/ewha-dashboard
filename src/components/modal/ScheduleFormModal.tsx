import { Modal } from 'antd';
import ScheduleForm from '../form/ScheduleForm';
import { EventInput } from '@fullcalendar/core/index.js';
import { SelectedDate, UpdateEventArg } from '../../types/Calendar';

interface Props {
  open: boolean;
  closeModal: () => void;
  addEvent: (event: EventInput) => void;
  selectedDate: SelectedDate;
  selectedEvent: EventInput | null;
  updateEvent: (event: UpdateEventArg) => void;
  deleteEvent: (id: string) => void;
}

export default function ScheduleFormModal({
  open,
  closeModal,
  addEvent,
  selectedDate,
  selectedEvent,
  updateEvent,
  deleteEvent,
}: Props) {
  return (
    <Modal
      open={open}
      onCancel={closeModal}
      centered={true}
      width={640}
      footer={null} // 모달 버튼 제거
      transitionName="" // 모달 애니메이션 제거
    >
      <div className="pt-6">
        <ScheduleForm
          closeModal={closeModal}
          addEvent={addEvent}
          selectedDate={selectedDate}
          selectedEvent={selectedEvent}
          isEditingMode={!!selectedEvent}
          updateEvent={updateEvent}
          initialAllDay={
            selectedEvent
              ? (selectedEvent.allDay as boolean)
              : selectedDate.allDay
          }
          deleteEvent={deleteEvent}
        />
      </div>
    </Modal>
  );
}
