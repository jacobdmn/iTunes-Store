import React from "react";
import SearchBox from "./searchBox";
import History from "./history";

const MyContent = ({ data }) => {
  return (
    <main>
      {/* <SearchBox data={data} /> */}
      <History data={data} />
    </main>
  );
};

export default MyContent;
