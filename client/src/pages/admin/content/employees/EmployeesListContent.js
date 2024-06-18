import React, { useEffect, useState } from "react";
import { Card, Icon } from "@mui/material";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import DataTable from "../../../../components/Tables/DataTable";
import { useSnackbar } from "notistack";
import MDButton from "../../../../components/MDButton";
import { faker } from '@faker-js/faker';
import { useNavigate } from "react-router-dom"
import ConfirmModal from "./components/ConfirmModal";

// import { getEmployees } from "./scripts/employee-scripts";

function generateRandomWorker() {
    return {
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      costPerDay: faker.datatype.number({ min: 100, max: 1000 })
    };
}

export const getEmployees = ()=>{
    const workers = [];
    for (let i = 0; i < 20; i++) {
        workers.push(generateRandomWorker());
    }
    return workers;
}

function EmployeesListContent(){
    const [employees, setEmployees] = useState(getEmployees());
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const notification = {add: enqueueSnackbar, close: closeSnackbar};
    const navigate = useNavigate();
    const rows = employees.map(employee => {
        return {
            name: (
                <MDBox>
                    <MDTypography fontSize="13pt" fontWeight="bold">
                        {employee.name + " " + employee.surname}
                    </MDTypography>
                </MDBox>
            ),
            cost: (
                <MDTypography>
                    {`${employee.costPerDay} Lek`}
                </MDTypography>
            ),
            actions: (
                <MDBox style={{ display: "flex" }}>
                    <MDButton style={{backgroundColor: 'lightgreen', color: "white", marginRight: "5px"}} onClick={()=>{
                        navigate('/app/employees/edit/random-id')
                    }}>
                        <Icon>edit</Icon>
                    </MDButton>
                    <ConfirmModal confirmAction={()=>{}}/>
                </MDBox>
            )
        }
    });
    const columns = [
        { Header: "Name", accessor: 'name', align: 'left' },
        { Header: 'Cost per day', accessor: 'cost', align: 'center' },
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
                    Employees
                </MDTypography>
                <MDButton onClick={()=>{
                    navigate("/app/employees/create")
                }}>
                    <Icon style={{ marginRight: "5px" }}>person_edit</Icon>
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

export default EmployeesListContent;