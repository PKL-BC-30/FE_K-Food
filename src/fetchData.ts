// src/utils/fetchData.ts

export interface User {
    email: string;
    katasandi: string;
  }
  
  export const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch('/dummy.json'); // Sesuaikan path dengan lokasi file dummy.json
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data as User[];
  };
  