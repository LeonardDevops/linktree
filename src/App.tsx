import { createBrowserRouter  } from "react-router";
import Home from "./pages/home";
import Admin from "./pages/admin";
import Login from "./pages/login";
import Networks from "./pages/networks";
import { Private } from "./routes";
import { ErrorPage } from "./pages/error";




const  router =  createBrowserRouter([
  { path:"/",
    element:<Home />
    
  },
  { path:"/admin",
    element:<Private><Admin /></Private>
    
  },
  { path:"/login",
    element:<Login/>
    
  },
  { path:"/networks",
    element:<Private><Networks/></Private>
    
  },
  {
    path:"*",
    element: <ErrorPage/ >
  }
  
  
])


export {router}