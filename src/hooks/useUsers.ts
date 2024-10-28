import { useMemo, useState } from 'react';
import type { UserDataType } from '../types/User';
import useUsersStore from '../store/userStore';

export const useUsers = () => {
  const { users, addUser, updateUser, deleteUser } = useUsersStore();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  // 삭제할 사용자들의 key를 저장하는 상태
  const [usersToDelete, setUsersToDelete] = useState<React.Key[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDataType | null>(null);

  /** 검색어에 따른 사용자 필터링 */
  const filteredUsers = useMemo(() => {
    if (!searchKeyword.trim()) return users;

    return users.filter((user) =>
      user.code.toLowerCase().includes(searchKeyword.toLowerCase().trim())
    );
  }, [users, searchKeyword]);

  /** 선택된 사용자 삭제 함수 */
  const deleteSelectedUsers = () => {
    deleteUser(usersToDelete);
    setUsersToDelete([]); // 삭제 후 선택 초기화
  };

  /** 검색어 변경 핸들러 */
  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  return {
    users: filteredUsers,
    selectedUser,
    updateUser,
    setSelectedUser,
    usersToDelete,
    setUsersToDelete,
    addUser,
    searchKeyword,
    deleteSelectedUsers,
    handleSearch,
  };
};
