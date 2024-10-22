import { useMemo, useState } from 'react';
import type { UserDataType } from '../types/User';

export const useUsers = (initialData: UserDataType[]) => {
  const [users, setUsers] = useState<UserDataType[]>(initialData);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<React.Key[]>([]);

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
    setUsers(users.filter((user) => !selectedUsers.includes(user.key)));
    setSelectedUsers([]); // 삭제 후 선택 초기화
  };

  /** 검색어 변경 핸들러 */
  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  return {
    users: filteredUsers,
    selectedUsers,
    setSelectedUsers,
    addUser,
    searchKeyword,
    deleteSelectedUsers,
    handleSearch,
  };
};
