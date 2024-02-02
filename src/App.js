import logo from './logo.svg';
import './App.css';
import AuthService from "./AuthService";
import UserListComponent from "./UserListComponent";

function App() {
  return (
      <div>
        <AuthService/>
        <UserListComponent/>
      </div>
  );
}

export default App;
