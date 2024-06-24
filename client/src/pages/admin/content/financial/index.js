import React from "react";
import { Route, Routes } from "react-router-dom"
import ContentModel from "../../../content_model.js";
import MDBox from "../../../../components/MDBox/index.js";
import FinancialListContent from "./FinancialListContent.js";
import FinancialCreateContent from "./FinancialCreateContent.js";

function FinancialContent(){
    return (
        <ContentModel>
            <MDBox py={3}>
                <Routes>
                    <Route path="/" element={<FinancialListContent />} />
                    <Route path="/create" element={<FinancialCreateContent />} />
                </Routes>
            </MDBox>
        </ContentModel>
    );
}

export default FinancialContent;