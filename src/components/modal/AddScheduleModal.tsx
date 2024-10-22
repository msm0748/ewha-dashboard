import { Modal } from 'antd';

interface Props {
  open: boolean;
  closeModal: () => void;
}

export default function AddScheduleModal({ open, closeModal }: Props) {
  return (
    <Modal
      title="할일 등록"
      open={open}
      onCancel={closeModal}
      centered={true}
    />
  );
}
