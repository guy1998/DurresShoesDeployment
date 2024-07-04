import React, { useEffect, useState } from "react";
import { Card, Icon, useMediaQuery } from "@mui/material";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import DataTable from "../../../../components/Tables/DataTable";
import { useSnackbar } from "notistack";
import MDButton from "../../../../components/MDButton";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./components/ConfirmModal";
import ViewProductsModal from "./components/ViewProductsModal";
import { getAllFinancials } from "./scripts/financial-scripts";

const checkIfToday = (stats) => {
  const now = new Date();
  const firstDay = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
  );
  const today = firstDay.toISOString().split("T")[0];
  return stats.some((stat) => {
    return stat.date.slice(0, 10) === today;
  });
};

function FinancialListContent() {
  const isMobile = useMediaQuery('(max-width: 599px)')
  const [stats, setStats] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const navigate = useNavigate();
  const rows = stats.map((stat) => {
    return {
      date: (
        <MDBox>
          <MDTypography fontSize="13pt" fontWeight="bold">
            {stat.date.slice(0, 10)}
          </MDTypography>
        </MDBox>
      ),
      profit: (
        <MDTypography>{`${stat.profit.$numberDecimal} Lek`}</MDTypography>
      ),
      cost: (
        <MDTypography>
          {`${stat.productionCost.$numberDecimal} Lek`}
        </MDTypography>
      ),
      actions: (
        <MDBox style={{ display: "flex" }}>
          <ViewProductsModal products={stat.products} />
          <ConfirmModal confirmAction={() => {}} />
        </MDBox>
      ),
    };
  });
  const columns = [
    { Header: "Date of report", accessor: "date", align: "left" },
    { Header: "Profit", accessor: "profit", align: "center" },
    { Header: "Cost of production", accessor: "cost", align: "center" },
    { Header: "Actions", accessor: "actions", align: "center" },
  ];

  useEffect(() => {
    getAllFinancials(notification, navigate).then((data) => {
      if (data) setStats(data);
    });
  }, []);

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
        <MDButton
          onClick={() => {
            if (checkIfToday(stats)) {
              notification.add("A report has already been issued today!", {
                variant: "info",
              });
            } else {
              navigate("/app/financial/create");
            }
          }}
        >
          <Icon style={{ marginRight: "5px" }}>analytics</Icon>
          {isMobile ? "" : "Create new"}
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

export default FinancialListContent;
