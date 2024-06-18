import React, { useState } from "react";
import { Card, Icon } from "@mui/material";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import DataTable from "../../../../components/Tables/DataTable";
import { useSnackbar } from "notistack";
import MDButton from "../../../../components/MDButton";
import { useNavigate } from "react-router-dom"
import ConfirmModal from "./components/ConfirmModal";

const generateRandomCode = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, decimals = 2) => {
  const factor = Math.pow(10, decimals);
  return Math.round((Math.random() * (max - min) + min) * factor) / factor;
};

const generateRandomArticle = () => {
  return {
    code: generateRandomCode(8), 
    quantity: getRandomInt(1, 100), 
    costPerArticle: getRandomFloat(1, 100, 2), 
  };
};

const generateRandomArticles = (count) => {
  const articles = [];
  for (let i = 0; i < count; i++) {
    articles.push(generateRandomArticle());
  }
  return articles;
};

function ProductListContent() {
  const [articles, setArticles] = useState(generateRandomArticles(20));
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const navigate = useNavigate();
  const rows = articles.map((article) => {
    return {
      name: (
        <MDBox>
          <MDTypography fontSize="13pt" fontWeight="bold">
            {article.code}
          </MDTypography>
        </MDBox>
      ),
      quantity: <MDTypography>{article.quantity}</MDTypography>,
      cost: <MDTypography>{`${article.costPerArticle} Lek`}</MDTypography>,
      actions: (
        <MDBox style={{ display: "flex" }}>
          <MDButton
            style={{
              backgroundColor: "lightgreen",
              color: "white",
              marginRight: "5px",
            }}
            onClick={() => {
              navigate("/app/products/edit/random-id");
            }}
          >
            <Icon>edit</Icon>
          </MDButton>
          <ConfirmModal confirmAction={() => {}} />
        </MDBox>
      ),
    };
  });
  const columns = [
    { Header: "Product code", accessor: "name", align: "left" },
    { Header: "Quantity", accessor: 'quantity', align: "center"},
    { Header: "Cost per article", accessor: "cost", align: "center" },
    { Header: "Actions", accessor: "actions", align: "center" },
  ];

  // useEffect(()=>{
  //     getEmployees().then(data=>{
  //         if(data)
  //             setEmployees(data)
  //     })
  // }, [])

  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
        display="flex"
        justifyContent="space-between"
      >
        <MDTypography variant="h6" color="white">
          Products
        </MDTypography>
        <MDButton
          onClick={() => {
            navigate("/app/products/create");
          }}
        >
          <Icon style={{ marginRight: "5px" }}>category</Icon>
          Create new
        </MDButton>
      </MDBox>
      <MDBox pt={3}>
        <DataTable
          table={{ columns, rows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          noEndBorder
        />
      </MDBox>
    </Card>
  );
}

export default ProductListContent;
