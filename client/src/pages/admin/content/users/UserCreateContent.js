import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Icon } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import MDBox from "../../../../components/MDBox";
import MDButton from "../../../../components/MDButton";
import { addUser } from "./scripts/user-scripts";

function UserCreateContent() {

  const navigator = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('')


  return (
    <MDBox
      style={{
        margin: "0 auto",
        width: "70%",
        height: "90%",
        backgroundColor: "#F4F4F4",
        borderRadius: "15px",
        boxShadow:
          "0px 10px 15px rgba(0, 0, 0, 0.3), 0px 15px 30px rgba(0, 0, 0, 0.22)",
      }}
      py={3}
    >
      <div
        style={{
          width: "90%",
          borderBottom: "2px solid gainsboro",
          margin: "5px auto 15px auto",
        }}
      >
        <h3>Create a new user</h3>
      </div>
      <div style={{ width: "90%", margin: "0 auto" }}>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          fullWidth
          style={{ margin: "10px 0" }}
          value={name}
          onChange={(event)=>setName(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Surname"
          variant="outlined"
          fullWidth
          style={{ margin: "10px 0" }}
          value={surname}
          onChange={(event)=>setSurname(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          fullWidth
          style={{ margin: "10px 0" }}
          value={username}
          onChange={(event)=>setUsername(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          fullWidth
          style={{ margin: "10px 0" }}
          value={password}
          onChange={(event)=>setPassword(event.target.value)}
        />
      </div>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        width: "90%",
        margin: "300px auto 0 auto",
        borderTop: "2px solid gainsboro",
        height: "70px"
      }}>
        <MDButton style={{ marginRight: "8px" }} color="info" onClick={()=>{
          addUser(notification, navigator, {
            name,
            surname,
            username,
            password
          })
        }}>
            <Icon style={{ marginRight: "5px" }}>check</Icon>
            Confirm
        </MDButton>
        <MDButton color="primary" onClick={()=>{
            navigator("/app/user")
        }}>
            <Icon style={{ marginRight: "5px" }}>close</Icon>
            Cancel
        </MDButton>
      </div>
    </MDBox>
  );
}

export default UserCreateContent;
