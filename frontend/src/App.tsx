
import { Outlet } from "react-router-dom";
import UserNavabar from "./components/user/navbar/UserNavabar";
const App = () => {
  return (
 <div className=" ">
  <div className="">
     <UserNavabar/>
  </div>
  <div className="mt-12">
     <Outlet/>
  </div>
 </div>
  );
};

export default App;