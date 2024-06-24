import React, { useEffect, useState } from "react";
import { Card, Icon } from "@mui/material";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import DataTable from "../../../../components/Tables/DataTable";
import { useSnackbar } from "notistack";
import MDButton from "../../../../components/MDButton";
import { useNavigate } from "react-router-dom"
import ConfirmModal from "./components/ConfirmModal";
import ViewProductsModal from "./components/ViewProductsModal";

const generateStats = ()=>{
    const dailyStatistics1 = {
        products: [
          {
            code: 'A001',
            quantity: 100,
            costPerArticle: 5.00
          },
          {
            code: 'A002',
            quantity: 200,
            costPerArticle: 3.50
          }
        ],
        profit: 1500.00,
        productionCost: 800.00,
        date: new Date()
      };
      
      const dailyStatistics2 = {
        products: [
          {
            code: 'B001',
            quantity: 150,
            costPerArticle: 7.00
          },
          {
            code: 'B002',
            quantity: 100,
            costPerArticle: 2.50
          },
          {
            code: 'B003',
            quantity: 50,
            costPerArticle: 4.00
          },
          {
            code: 'B001',
            quantity: 150,
            costPerArticle: 7.00
          },
          {
            code: 'B002',
            quantity: 100,
            costPerArticle: 2.50
          },
          {
            code: 'B003',
            quantity: 50,
            costPerArticle: 4.00
          }
        ],
        profit: 2000.00,
        productionCost: 1000.00,
        date: new Date()
      };
      
      const dailyStatistics3 = {
        products: [
          {
            code: 'C001',
            quantity: 300,
            costPerArticle: 6.00
          },
          {
            code: 'C002',
            quantity: 400,
            costPerArticle: 1.50
          }
        ],
        profit: 2500.00,
        productionCost: 1200.00,
        date: new Date()
      };

      const stats = [];
      stats.push(dailyStatistics1);
      stats.push(dailyStatistics2)
      stats.push(dailyStatistics3);
      return stats;
}


function FinancialListContent(){
    const [stats, setStats] = useState(generateStats());
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const notification = {add: enqueueSnackbar, close: closeSnackbar};
    const navigate = useNavigate();
    const rows = stats.map(stat => {
        return {
            date: (
                <MDBox>
                    <MDTypography fontSize="13pt" fontWeight="bold">
                        {stat.date.toDateString()}
                    </MDTypography>
                </MDBox>
            ),
            profit: (
                <MDTypography>
                    {`${stat.profit} Lek`}
                </MDTypography>
            ),
            cost: (
                <MDTypography>
                    {`${stat.productionCost} Lek`}
                </MDTypography>
            ),
            actions: (
                <MDBox style={{ display: "flex" }}>
                    <ViewProductsModal products={stat.products}/>
                    <ConfirmModal confirmAction={()=>{}}/>
                </MDBox>
            )
        }
    });
    const columns = [
        { Header: "Date of report", accessor: 'date', align: 'left' },
        { Header: "Profit", accessor: 'profit', align: 'center' },
        { Header: 'Cost of production', accessor: 'cost', align: 'center' },
        { Header: 'Actions', accessor: 'actions', align: 'center' },
    ]

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
                    Financial reports
                </MDTypography>
                <MDButton onClick={()=>{
                    navigate("/app/financial/create")
                }}>
                    <Icon style={{ marginRight: "5px" }}>analytics</Icon>
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
    )
}

export default FinancialListContent;