import { Box, Input } from '@chakra-ui/react';
import {IUserList} from '../interfaces/User';
import { useEffect, useState } from 'react';
import { apiAxios } from '@/library/api';


export default function UserList (props:IUserList){
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<IUserList[]>([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await apiAxios.get(`/auth?search=${searchTerm}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error(error);
      }
    };})
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleUserClick = (user: IUserList) => {
    // Do something with the selected user
    console.log(user);
    setSearchTerm("");
    setSearchResults([]);
  };
  return (
    <Box>
    <Input
      type="text"
      value={searchTerm}
      onChange={handleInputChange}
      placeholder="Search by fullname, picture, or username"
    />

    {searchResults.length > 0 && (
      <ul>
        {searchResults.map((user) => (
          <li key={user.id} onClick={() => handleUserClick(user)}>
            {user.fullname} ({user.username})
          </li>
        ))}
      </ul>
    )}
  </Box>
);
};
