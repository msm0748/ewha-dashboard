import { Modal } from 'antd';
import ScheduleForm from '../form/ScheduleForm';
import { EventInput } from '@fullcalendar/core/index.js';

interface Props {
  open: boolean;
  closeModal: () => void;
  addEvent: (event: EventInput) => void;
}

export default function AddScheduleModal({
  open,
  closeModal,
  addEvent,
}: Props) {
  return (
    <Modal
      open={open}
      onCancel={closeModal}
      centered={true}
      width={640}
      footer={null} // 모달 버튼 제거
    >
      <div className="pt-6">
        <ScheduleForm closeModal={closeModal} addEvent={addEvent} />
      </div>
    </Modal>
  );
}
