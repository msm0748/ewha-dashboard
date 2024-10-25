import { useMemo, useState } from 'react';
import type { UserDataType } from '../types/User';

export const useUsers = (initialData: UserDataType[]) => {
  const [users, setUsers] = useState<UserDataType[]>(initialData);
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

  /** 사용자 추가 함수 */
  const addUser = (user: UserDataType) => {
    setUsers([...users, user]);
  };

  /** 선택된 사용자 삭제 함수 */
  const deleteSelectedUsers = () => {
    setUsers(users.filter((user) => !usersToDelete.includes(user.key)));
    setUsersToDelete([]); // 삭제 후 선택 초기화
  };

  /** 검색어 변경 핸들러 */
  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  return {
    users: filteredUsers,
    selectedUser,
    setSelectedUser,
    usersToDelete,
    setUsersToDelete,
    addUser,
    searchKeyword,
    deleteSelectedUsers,
    handleSearch,
  };
};
