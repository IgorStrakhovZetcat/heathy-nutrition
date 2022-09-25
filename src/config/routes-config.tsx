import AddProduct from "../components/pages/AddProduct";
import Menu from "../components/pages/Menu";
import { RouteType } from "../models/RouteType";
import Login from "../components/pages/Login";
import Logout from "../components/pages/Logout";
import MyOrder from "../components/pages/MyOrder";
import Contacts from "../components/pages/Contacts";
import Chat from "../components/pages/Chat";

export const MENU_PATH = '/menu';
export const ADD_PRODUCT_PATH = '/product/add';
export const LOGIN_PATH = '/login';
export const LOGOUT_PATH = '/logout';
export const MY_ORDER_PATH = '/order';
export const CONTACTS = '/contacts';
export const CHAT = '/chat';

export const ROUTES: RouteType[] = [
    {path: MENU_PATH, label: 'Menu', element: <Menu/>, authenticated: true},
    {path: MENU_PATH, label: 'Menu', element: <Menu/>},
    {path: ADD_PRODUCT_PATH, label: 'New Product', element: <AddProduct/>, authenticated: true},
    {path: ADD_PRODUCT_PATH, label: 'New Product', element: <AddProduct/>},
    {path: MY_ORDER_PATH, label: 'My Cart', element: <MyOrder/>, authenticated: true},
    // {path: CHAT, label: 'Chat', element: <Chat/>, authenticated: true},
    // {path: CHAT, label: 'Chat', element: <Chat/>},
    {path: CONTACTS, label: 'Contacts', element: <Contacts/>, authenticated: true},
    {path: CONTACTS, label: 'Contacts', element: <Contacts/>},
    {path: LOGOUT_PATH, label: 'Logout', element: <Logout/>, authenticated: true},
    {path: LOGIN_PATH, label: 'Login', element: <Login/>},
    
]