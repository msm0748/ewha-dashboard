import { Modal } from 'antd';
import { UserDataType } from '../../types/User';
import UsersForm from '../form/UsersForm';

interface Props {
  open: boolean;
  closeModal: () => void;
  addUser: (user: UserDataType) => void;
}

export default function AddUserModal({ open, closeModal, addUser }: Props) {
  return (
    <Modal
      title="회원 등록"
      centered
      open={open}
      onCancel={closeModal}
      width={800}
      footer={null} // 모달 버튼 제거
    >
      <UsersForm addUser={addUser} closeModal={closeModal} />
    </Modal>
  );
}
