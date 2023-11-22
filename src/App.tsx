import "./styles/globals.css";

import { Box } from "@mui/material";

import { Permissions, Roles } from "./utils";
import { DofleiniTable } from "./components";

const App = () => {
  return (
    <Box mt="5%" mx="10%">
      <DofleiniTable roles={Roles} permissions={Permissions} />
    </Box>
  );
};

export default App;
