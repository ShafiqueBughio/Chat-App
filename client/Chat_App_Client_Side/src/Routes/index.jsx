import {createBrowserRouter} from "react-router-dom"
import App from "../App";
import Register_Page from "../Pages/Register_Page";
import Check_Email_Page from "../Pages/Check_Email_Page";
import Check_Password_Page from "../Pages/Check_Password_Page";
import Home from "../Pages/Home";
import Message_Page from "../Components/Message_Page";
import Auth_Layout from "../Layout";
import ForgotPassword from "../Pages/ForgotPassword";
import CustomPage from "../Pages/CustomPage";

const router = createBrowserRouter([
{
    path:"/",
    element:<App/>,
    children:[
        {
            path:"register",
            element:<Auth_Layout><Register_Page/></Auth_Layout>
        },
        {
            path:"email",
            element:<Auth_Layout><Check_Email_Page/></Auth_Layout>
        },
        {
            path:"password",
            element:<Auth_Layout><Check_Password_Page/></Auth_Layout>
        },
        {
            path:"forgot-password",
            element:<Auth_Layout><ForgotPassword/></Auth_Layout>
        },
        {
            path:"",
            element:<Home/>,
            children:[
                {
                    path:":userid",
                    element:<Message_Page/>
                }
            ]
        }
    ]
},
{
    path:'*',
    element:<CustomPage/>
}
])

export default router;