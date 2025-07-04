import Home from "../views/home/Home";
import Layout from "../components/layout/Layout";
import LayoutNoAuth from "../components/layout/LayoutNoAuth";
import Login from "../views/login/Login";
import NoPermitido from "../views/noPermitido/NoPermitido";

const RoutesUrls = [
  {
    path: "/",
    exact: true,
    main: () => <LayoutNoAuth children={ Login } pageName={'Login'}/>
  },
];


const PrivateRoutes = [

  /* ======== PRIVADITAS ======== */

  {
    path: "/",
    exact: true,
    label: 'Home',
    main: () => <Layout children={ Home } pageName={'Home'} hideTheFooter={true}/>
  },
  {
    path: "/no-permitido",
    exact: true,
    label: 'Home',
    main: () => <Layout children={ NoPermitido } pageName={'NoPermitido'} hideTheFooter={true}/>
  },
];


export default RoutesUrls;
export{PrivateRoutes}