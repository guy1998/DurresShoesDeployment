import React from "react";

import MDBox from "../../../../../components/MDBox";
import ReportsBarChart from "../../../../../components/Charts/BarCharts/ReportsBarChart/index";

function BarChart() {

    const reportsBarChartData = {
        labels: ["M", "T", "W", "T", "F", "S", "S"],
        datasets: { label: "Sales", data: [50, 20, 10, 22, 50, 10, 40] },
    }

    return (
        <MDBox py={3}>
            <ReportsBarChart
                color="info"
                title="Profit statistics"
                description="This week's performance"
                date="updated daily"
                chart={reportsBarChartData}
                style={{ width: "100%"}}
            />
        </MDBox>
    );
}

export default BarChart;