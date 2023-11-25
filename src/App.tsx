import "./styles/globals.css";

import { Box, Typography } from "@mui/material";

import { Permissions, Roles } from "./utils";
import { DofleiniTable } from "./components";

const App = () => {
  return (
    <Box mt="5%" mx="10%">
      <Typography variant="h3">Roles y Permisos</Typography>
      <DofleiniTable roles={Roles} permissions={Permissions} />
    </Box>
  );
};

export default App;
