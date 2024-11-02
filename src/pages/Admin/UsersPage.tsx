import { Button } from 'antd';
import { Input } from 'antd';
import UserFormModal from '../../components/modal/UserFormModal';
import { useUsers } from '../../hooks/useUsers';
import { useModal } from '../../hooks/useModal';
import DeleteConfirmModal from '../../components/modal/DeleteConfirmModal';
import UserTable from '../../components/UserTable';
import { usePageTitle } from '../../hooks/usePageTitle';
const { Search } = Input;

export default function UsersPage() {
  usePageTitle('회원 관리');

  const {
    users,
    usersToDelete,
    searchKeyword,
    selectedUser,
    updateUser,
    setUsersToDelete,
    addUser,
    deleteSelectedUsers,
    setSelectedUser,
    handleSearch,
  } = useUsers();

  const {
    isOpen: isUserFormModalOpen,
    openModal: openUserFormModal,
    closeModal: closeUserFormModal,
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
          <Button type="primary" onClick={openUserFormModal}>
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

      <UserTable
        users={users}
        setUsersToDelete={setUsersToDelete}
        setSelectedUser={setSelectedUser}
        openUserFormModal={openUserFormModal}
      />

      {isUserFormModalOpen && (
        <UserFormModal
          open={isUserFormModalOpen}
          closeModal={closeUserFormModal}
          addUser={addUser}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          updateUser={updateUser}
        />
      )}

      {isDeleteUserModalOpen && (
        <DeleteConfirmModal
          title="유저 삭제"
          isOpen={isDeleteUserModalOpen}
          closeModal={closeDeleteUserModal}
          onConfirm={deleteSelectedUsers}
        />
      )}
    </div>
  );
}
