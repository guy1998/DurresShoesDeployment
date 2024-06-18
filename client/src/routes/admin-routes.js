import Icon from "@mui/material/Icon";
import Test from "../components/test";
import EmployeesContent from "../pages/admin/content/employees/index.js"

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Test />,
  },
  {
    type: "collapse",
    name: "Employees",
    key: "employees",
    icon: <Icon fontSize="small">worker</Icon>,
    route: "/employees",
    component: <EmployeesContent />,
  },
  {
    type: "collapse",
    name: "Products",
    key: "products",
    icon: <Icon fontSize="small">inventory_2</Icon>,
    route: "/products",
    component: <Test />,
  },
  {
    type: "collapse",
    name: "Financial reports",
    key: "financial",
    icon: <Icon fontSize="small">analytics</Icon>,
    route: "/financial",
    component: <Test />,
  },
];

export default routes;