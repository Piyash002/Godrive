
import { Outlet } from "react-router-dom";
import UserNavabar from "./components/user/navbar/UserNavabar";
const App = () => {
  return (
 <div className=" ">
  <div>
     <UserNavabar/>
  </div>
  <div className="">
     <Outlet/>
  </div>
 </div>
  );
};

export default App;