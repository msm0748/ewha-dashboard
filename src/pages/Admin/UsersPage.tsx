import { Button } from 'antd';
import { Input } from 'antd';
import AddUserModal from '../../components/modal/AddUserModal';
import { useUsers } from '../../hooks/useUsers';
import { userDummyData } from '../../data/dumy/userDummyData';
import { useModal } from '../../hooks/useModal';
import DeleteConfirmModal from '../../components/modal/DeleteConfirmModal';
import UserTable from '../../components/UserTable';
const { Search } = Input;

export default function UsersPage() {
  const {
    users,
    usersToDelete,
    searchKeyword,
    setUsersToDelete,
    addUser,
    deleteSelectedUsers,
    handleSearch,
  } = useUsers(userDummyData);

  const {
    isOpen: isAddUserModalOpen,
    openModal: openAddUserModal,
    closeModal: closeAddUserModal,
  } = useModal();

  const {
    isOpen: isDeleteUserModalOpen,
    openModal: openDeleteUserModal,
    closeModal: closeDeleteUserModal,
  } = useModal();

  return (
    <div>
      <div className="flex items-start gap-12 mb-4">
        <div className="flex-1">
          <Search
            placeholder="코드로 검색"
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchKeyword}
            enterButton
            allowClear
          />
        </div>
        <div className="flex gap-4">
          <Button type="primary" onClick={openAddUserModal}>
            회원 등록
          </Button>
          <Button
            danger
            onClick={openDeleteUserModal}
            disabled={usersToDelete.length === 0}
          >
            회원 삭제
          </Button>
        </div>
      </div>

      <UserTable users={users} setUsersToDelete={setUsersToDelete} />

      <AddUserModal
        open={isAddUserModalOpen}
        closeModal={closeAddUserModal}
        addUser={addUser}
      />

      <DeleteConfirmModal
        title="유저 삭제"
        isOpen={isDeleteUserModalOpen}
        closeModal={closeDeleteUserModal}
        onConfirm={deleteSelectedUsers}
      />
    </div>
  );
}
