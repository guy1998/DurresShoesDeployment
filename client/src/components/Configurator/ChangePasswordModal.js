import React from "react";
import { styled, css } from "@mui/system";
import { Modal as BaseModal, Icon } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import MDButton from "../MDButton";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import { changePassword } from "./scripts/user-scripts";
import { useNavigate } from "react-router-dom";

function ChangePasswordModal() {
  const [open, setOpen] = React.useState(false);
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOldPassword("");
    setNewPassword("");
    setOpen(false);
  };
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const navigator = useNavigate();

  return (
    <>
      <TriggerButton onClick={handleOpen}>
        <Icon color="secondary" fontSize="large" style={{ marginRight: "5px" }}>
          password
        </Icon>
        Change password
      </TriggerButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={style}>
          <h3 className="modal-title">Change your password</h3>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <TextField
              id="outlined-password-input"
              label="Current password"
              type="password"
              autoComplete="current-password"
              fullWidth
              value={oldPassword}
              onChange={(event)=>setOldPassword(event.target.value)}
            />
            <TextField
              id="outlined-password-input"
              label="New password"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(event)=>setNewPassword(event.target.value)}
              sx={{ marginTop: "15px", marginBottom: "15px" }}
            />
            <MDButton
              color="info"
              width="60%"
              onClick={() => {
                if(!newPassword || !oldPassword){
                    notification.add("Both fields are requested!", { variant: "error" });
                } else {
                    changePassword(notification, navigator, newPassword, oldPassword, handleClose);
                }
              }}
            >
              <Icon sx={{ marginRight: "5px" }}>check</Icon>
              Confirm
            </MDButton>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
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

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const TriggerButton = styled(Button)(
  ({ theme }) => `
    font-family: 'Poppins', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    width: 100%;
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? grey[900] : "light"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[600]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    marginBottom: 15px;
  
    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }
  
    &:active {
      background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 4px ${
        theme.palette.mode === "dark" ? blue[300] : blue[200]
      };
      outline: none;
    }
  `
);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 270,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0 auto;
      line-height: 1.5rem;
      margin-bottom: 8px;
      width: 100%;
      border-bottom: 1px solid gainsboro;
      height: 40px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);

export default ChangePasswordModal;
