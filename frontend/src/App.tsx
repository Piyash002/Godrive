
import { Outlet } from "react-router-dom";
import UserNavabar from "./components/user/navbar/UserNavabar";
const App = () => {
  return (
 <div className="dark:bg-gray-900 dark:text-white">
  <div>
     <UserNavabar/>
  </div>
  <div className="lg:px-4 sm:px-2">
     <Outlet/>
  </div>
 </div>
  );
};

export default App;