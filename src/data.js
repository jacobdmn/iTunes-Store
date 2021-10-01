import { createContext, useState } from "react";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [data_GLOBAL, setData_GLOBAL] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  favoriteList.push(data_GLOBAL.filter((song) => song.love));
  return (
    <UserContext.Provider
      value={{ data_GLOBAL, setData_GLOBAL, favoriteList, setFavoriteList }}>
      {children}
    </UserContext.Provider>
  );
};
