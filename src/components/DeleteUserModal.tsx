import { Modal } from 'antd';

interface Props {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export default function DeleteUserModal({ open, onCancel, onOk }: Props) {
  return (
    <Modal
      title="유저 삭제"
      centered
      open={open}
      okText="삭제"
      cancelText="취소"
      onOk={() => {
        onOk();
        onCancel();
      }}
      onCancel={onCancel}
    >
      <p>유저를 삭제하시겠습니까?</p>
    </Modal>
  );
}
