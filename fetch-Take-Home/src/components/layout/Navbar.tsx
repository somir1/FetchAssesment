import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { logout } from "../../apis";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate("/");
    }
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "background.paper", p: 1 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Welcome
        </Typography>
        <Box>
          <Button label="Logout" onClick={handleLogout} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
