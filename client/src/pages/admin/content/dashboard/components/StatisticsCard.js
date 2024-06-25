import React from "react";

import MDBox from "../../../../../components/MDBox";
import ComplexStatisticsCard from "../../../../../components/Cards/StatisticsCards/ComplexStatisticsCard"


function StastisticsCard({ color, icon, title, request }){
    return (
        <MDBox mb={1.5}>
            <ComplexStatisticsCard
                color = {color}
                icon= {icon}
                title= {title}
                count={281}
                percentage={{
                    color: "success",
                    amount: "+55%",
                    label: "than lask week",
                }}
            />
        </MDBox>
    )
}

export default StastisticsCard;