import { Modal } from 'antd';

interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  closeModal: () => void;
  title: string;
}

export default function DeleteConfirmModal({
  isOpen,
  closeModal,
  onConfirm,
  title,
}: Props) {
  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };
  return (
    <Modal
      title={title}
      centered
      open={isOpen}
      okText="삭제"
      cancelText="취소"
      onOk={handleConfirm}
      onCancel={closeModal}
      transitionName="" // 모달 애니메이션 제거
    >
      <p>유저를 삭제하시겠습니까?</p>
    </Modal>
  );
}
