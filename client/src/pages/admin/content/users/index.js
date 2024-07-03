import React from "react";
import { Routes, Route } from "react-router-dom";
import ContentModel from "../../../content_model.js";
import MDBox from "../../../../components/MDBox/index.js";
import UserListContent from "./UserListContent.js";
import UserCreateContent from "./UserCreateContent.js";

function UserContent(){
    return (
        <ContentModel>
            <MDBox py={3}>
                <Routes>
                    <Route path="/" element={<UserListContent />} />
                    <Route path="/create" element={<UserCreateContent />} />
                </Routes>
            </MDBox>
        </ContentModel>
    );
}

export default UserContent;