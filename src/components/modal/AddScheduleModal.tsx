import { Modal } from 'antd';
import ScheduleForm from '../form/ScheduleForm';

interface Props {
  open: boolean;
  closeModal: () => void;
}

export default function AddScheduleModal({ open, closeModal }: Props) {
  return (
    <Modal
      open={open}
      onCancel={closeModal}
      centered={true}
      width={640}
      footer={null} // 모달 버튼 제거
    >
      <div className="pt-6">
        <ScheduleForm />
      </div>
    </Modal>
  );
}
