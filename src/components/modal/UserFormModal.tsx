import { Modal } from 'antd';
import { UserDataType } from '../../types/User';
import UsersForm from '../form/UsersForm';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface Props {
  open: boolean;
  closeModal: () => void;
  addUser: (user: UserDataType) => void;
  selectedUser: UserDataType | null;
  setSelectedUser: Dispatch<SetStateAction<UserDataType | null>>;
  updateUser: (user: UserDataType) => void;
}

export default function UserFormModal({
  open,
  closeModal,
  addUser,
  selectedUser,
  setSelectedUser,
  updateUser,
}: Props) {
  const handleCloseModal = () => {
    closeModal();
    setSelectedUser(null);
  };

  return (
    <Modal
      title="회원 등록"
      centered
      open={open}
      onCancel={handleCloseModal}
      width={800}
      footer={null} // 모달 버튼 제거
      transitionName="" // 모달 애니메이션 제거
    >
      <UsersForm
        addUser={addUser}
        updateUser={updateUser}
        closeModal={handleCloseModal}
        selectedUser={selectedUser}
        isEditingMode={!!selectedUser}
      />
    </Modal>
  );
}
