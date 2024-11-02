import { create } from 'zustand';
import { UserDataType } from '../types/User';
import { userDummyData } from '../data/dumy/userDummyData';

type Store = {
  users: UserDataType[];
  addUser: (user: UserDataType) => void;
  deleteUser: (usersToDelete: React.Key[]) => void;
  updateUser: (user: UserDataType) => void;
};

const useUsersStore = create<Store>()((set) => ({
  users: userDummyData,
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  deleteUser: (usersToDelete) =>
    set((state) => ({
      users: state.users.filter((user) => !usersToDelete.includes(user.key)),
    })),
  updateUser: (user) =>
    set((state) => ({
      users: state.users.map((u) => (u.key === user.key ? user : u)),
    })),
}));

export default useUsersStore;
