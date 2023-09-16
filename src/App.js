import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import {User} from './pages/User'
import { Product } from "./pages/Product";
import { AddProduct } from "./pages/AddProduct";
import { Category } from "./pages/Category";
import { AddCategory } from "./pages/CreateCategory";
import { GroupCategory } from "./pages/GroupCategory";
import { AddGroupCategory } from "./pages/AddGroup";
import { Orders } from "./pages/Order";
import { DetailOrder } from "./pages/DetailOrder";
import { Options } from "./pages/Option";
import { SendMessage } from "./pages/SendMessage";
import { Notification } from "./pages/Notification";
import NotificationForm from "./components/AddNotification";
import { Popup } from "./pages/Popup";
import PopupForm from "./components/AddPopup";
import { Ads } from "./pages/Ads";
import AdsForm from "./components/AddAds";
import { Login } from "./pages/Login";
import { EditPage } from "./pages/EditPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
       <Route exact path="/" element={<Home/>}/>
       <Route exact path="/users" element={<User/>}/>
       <Route exact path="/products/:name" element={<Product/>}/>
       <Route exact path="/add/products" element={<AddProduct/>}/>
       <Route exact path="/add/category" element={<AddCategory/>}/>
       <Route exact path="/category" element={<Category/>}/>
       <Route exact path="/orders" element={<Orders/>}/>
       <Route exact path="/group/category" element={<GroupCategory/>}/>
       <Route exact path="/add/group/category" element={<AddGroupCategory/>}/>
       <Route exact path="/order/:id" element={<DetailOrder/>}/>
       <Route exact path="/edit/product/:id" element={<EditPage/>}/>
       <Route exact path="/options" element={<Options/>}/>
       <Route exact path="/message" element={<SendMessage/>}/>
       <Route exact path="/notification" element={<Notification />}/>
       <Route exact path="/add/notification" element={<NotificationForm />}/>
       <Route exact path="/popup" element={<Popup />}/>
       <Route exact path="/add/popup" element={<PopupForm />}/>
       <Route exact path="/ads" element={<Ads />}/>
       <Route exact path="/login" element={<Login />}/>
       <Route exact path="/add/ads" element={<AdsForm />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
