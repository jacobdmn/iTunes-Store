import React from "react";
import SearchBox from "./searchBox";
import History from "./history";

const MyContent = ({ data, setData, favoriteList }) => {
  return (
    <main>
      <SearchBox data={data} setData={setData} />
      {/* <History data={data} favoriteList={favoriteList} /> */}
    </main>
  );
};

export default MyContent;
