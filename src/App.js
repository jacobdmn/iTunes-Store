import "./css/App.css";
import MyHeader from "./header/header";
import MyContent from "./content/content";
import data from "./data";

function App() {
  return (
    <div className='App'>
      <MyHeader />
      <MyContent data={data} />
    </div>
  );
}

export default App;
