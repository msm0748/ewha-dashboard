import { useMemo, useState } from 'react';
import type { UserDataType } from '../types/User';

export const useUsers = (initialData: UserDataType[]) => {
  const [users, setUsers] = useState<UserDataType[]>(initialData);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<React.Key[]>([]);

  // 검색된 사용자 목록을 메모이제이션
  const filteredUsers = useMemo(() => {
    if (!searchKeyword.trim()) return users;

    return users.filter((user) =>
      user.code.toLowerCase().includes(searchKeyword.toLowerCase().trim())
    );
  }, [users, searchKeyword]);

  const addUser = (user: UserDataType) => {
    setUsers([...users, user]);
  };

  const removeSelectedUsers = () => {
    setUsers(users.filter((user) => !selectedUsers.includes(user.key)));
    setSelectedUsers([]); // 삭제 후 선택 초기화
  };

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  return {
    users: filteredUsers,
    totalUsers: users.length,
    filteredCount: filteredUsers.length,
    selectedUsers,
    setSelectedUsers,
    addUser,
    searchKeyword,
    removeSelectedUsers,
    handleSearch,
  };
};
