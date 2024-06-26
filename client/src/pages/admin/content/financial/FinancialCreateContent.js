import React, { useEffect, useState } from "react";
import { Card, Icon, Menu } from "@mui/material";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import DataTable from "../../../../components/Tables/DataTable";
import { useSnackbar } from "notistack";
import MDButton from "../../../../components/MDButton";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
//import { NumericFormat } from "react-number-format";

const CustomNumberInput = React.forwardRef((props, ref) => {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInputElement,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: "▴",
        },
        decrementButton: {
          children: "▾",
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

const calculateEarned = (products)=>{
    return products.reduce((acc, product)=>{
        return acc + product.costPerArticle * product.quantity
    }, 0)
}
const getProducts = () => {
  return [
    {
      code: "A001",
      costPerArticle: 5.0,
    },
    {
      code: "A002",
      costPerArticle: 3.5,
    },
    {
      code: "B001",
      costPerArticle: 7.0,
    },
    {
      code: "B002",
      costPerArticle: 2.5,
    },
    {
      code: "B003",
      costPerArticle: 4.0,
    },
    {
      code: "B004",
      costPerArticle: 7.0,
    },
    {
      code: "B005",
      costPerArticle: 2.5,
    },
    {
      code: "B006",
      costPerArticle: 4.0,
    },
    {
      code: "C001",
      costPerArticle: 6.0,
    },
    {
      code: "C002",
      costPerArticle: 1.5,
    },
  ];
};

function FinancialCreateContent() {
  const [products, setProducts] = useState(getProducts());
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [tempCode, setTempCode] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const navigate = useNavigate();
  const onChangeQuantity = (quantity, code) => {
    const newTableData = selectedProducts.map((product) => {
      if (product.code === code) {
        product.quantity = quantity !== null ? quantity : 1;
      }
      return product;
    });
    setSelectedProducts(newTableData);
  };
  const onRemoveProduct = (code) => {
    const newTableData = selectedProducts.filter(
      (product) => product.code !== code
    );
    setSelectedProducts(newTableData);
  };
  const rows = selectedProducts.map((product) => {
    return {
      code: (
        <MDBox>
          <MDTypography fontSize="13pt" fontWeight="bold">
            {product.code}
          </MDTypography>
        </MDBox>
      ),
      cost: <MDTypography>{`${product.costPerArticle} Lek`}</MDTypography>,
      quantity: (
        <CustomNumberInput
          aria-label="Demo number input"
          min={1}
          value={product.quantity}
          onChange={(event, val) => onChangeQuantity(val, product.code)}
          placeholder="Type a number…"
        />
      ),
      subtotal: (
        <MDTypography>
          {`${product.costPerArticle * product.quantity} Lek`}
        </MDTypography>
      ),
      remove: (
        <MDButton
          color="primary"
          onClick={() => {
            onRemoveProduct(product.code);
          }}
        >
          <Icon>close</Icon>
        </MDButton>
      ),
    };
  });
  const columns = [
    { Header: "Code", accessor: "code", align: "left" },
    { Header: "Cost", accessor: "cost", align: "center" },
    { Header: "Quantity", accessor: "quantity", align: "center" },
    { Header: "Subtotal", accessor: "subtotal", align: "center" },
    { Header: "", accessor: "remove", align: "center" },
  ];
  const onSelectProduct = (event) => {
    const code = event.target.value;
    if (code) {
      setTempCode(code);
      const selected = {
        ...products.filter((product) => product.code === code)[0],
        quantity: 1,
      };
      const exists = selectedProducts.filter(
        (product) => product.code === selected.code
      );
      if (exists.length)
        notification.add("This product is already selected!", {
          variant: "info",
        });
      else {
        const newlySelectedProducts = [...selectedProducts, selected];
        setSelectedProducts(newlySelectedProducts);
      }
    }
  };

  // useEffect(()=>{
  //     getEmployees().then(data=>{
  //         if(data)
  //             setEmployees(data)
  //     })
  // }, [])

  return (
    <MDBox>
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
          alignItems="center"
        >
          <MDTypography variant="h6" color="white">
            Select products
          </MDTypography>
          <FormControl style={{ width: "400px", height: "50px" }}>
            <InputLabel
              id="demo-simple-select-label"
              style={{ color: "white" }}
            >
              Products
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Products"
              style={{ width: "400px", height: "50px" }}
              value={tempCode}
              onChange={onSelectProduct}
            >
              <MenuItem keyt={"default"} value={""}></MenuItem>
              {products.map((product) => {
                return (
                  <MenuItem key={product.code} value={product.code}>
                    {product.code}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </MDBox>
        <MDBox pt={3}>
          {selectedProducts.length ? (
            <DataTable
              table={{ columns, rows }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              No products selected yet
            </div>
          )}
        </MDBox>
      </Card>
      <MDBox
        style={{
          backgroundColor: "white",
          boxShadow:
            "0px 5px 15px rgba(0, 0, 0, 0.2), 0px 1px 15px rgba(0, 0, 0, 0.)",
            marginTop: "10px",
            borderRadius: "10px",
            padding: "0 40px 0 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
        }}
      >
        <MDBox>
            <MDTypography>Total earned: { calculateEarned(selectedProducts) }</MDTypography>
            <MDTypography>Total expense: 100</MDTypography>
            <MDTypography>Total profit: { calculateEarned(selectedProducts) - 100}</MDTypography>
        </MDBox>
        <MDButton color="info">
            <Icon style={{ marginRight: "5px" }}>check</Icon>
            Confirm
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledInputRoot = styled("div")(
  ({ theme }) => `
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 400;
      border-radius: 8px;
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[700] : grey[200]
      };
      box-shadow: 0px 2px 4px ${
        theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
      };
      display: grid;
      grid-template-columns: 1fr 19px;
      grid-template-rows: 1fr 1fr;
      overflow: hidden;
      column-gap: 8px;
      padding: 4px;
    
      &.${numberInputClasses.focused} {
        border: 2px solid green;
      }
    
      &:hover {
        border-color: green;
      }
    
      // firefox
      &:focus-visible {
        outline: 0;
      }
    `
);

const StyledInputElement = styled("input")(
  ({ theme }) => `
      font-size: 0.875rem;
      font-family: inherit;
      font-weight: 400;
      line-height: 1.5;
      grid-column: 1/2;
      grid-row: 1/3;
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      background: inherit;
      border: none;
      border-radius: inherit;
      padding: 8px 12px;
      outline: 0;
    `
);

const StyledButton = styled("button")(
  ({ theme }) => `
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      appearance: none;
      padding: 0;
      width: 19px;
      height: 19px;
      font-family: system-ui, sans-serif;
      font-size: 0.875rem;
      line-height: 1;
      box-sizing: border-box;
      background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
      border: 0;
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 120ms;
    
      &:hover {
        background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
        border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
        cursor: pointer;
      }
    
      &.${numberInputClasses.incrementButton} {
        grid-column: 2/3;
        grid-row: 1/2;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border: 1px solid;
        border-bottom: 0;
        border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
        background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
        color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    
        &:hover {
          cursor: pointer;
          color: white;
          background: ${theme.palette.mode === "dark" ? blue[600] : "green"};
          border-color: ${theme.palette.mode === "dark" ? blue[400] : "green"};
        }
      }
    
      &.${numberInputClasses.decrementButton} {
        grid-column: 2/3;
        grid-row: 2/3;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        border: 1px solid;
        border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
        background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
        color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
      }
    
      &:hover {
        cursor: pointer;
        color: white;
        background: ${theme.palette.mode === "dark" ? blue[600] : "green"};
        border-color: ${theme.palette.mode === "dark" ? blue[400] : "green"};
      }
    
      & .arrow {
        transform: translateY(-1px);
      }
    
      & .arrow {
        transform: translateY(-1px);
      }
    `
);

export default FinancialCreateContent;
