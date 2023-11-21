import { DeleteOutline } from "@mui/icons-material";
import { Box, Tooltip, Checkbox, IconButton } from "@mui/material";

interface Props {
    checked: boolean;

    // Methods
    deleteCol: () => void;
    grantPermissions: () => void;
    deletePermissions: () => void;
}

const CheckNDelete = ({checked, deleteCol, grantPermissions, deletePermissions }: Props) => {
  return (
    <Box className="fadeIn">
      <Tooltip title={checked ? "Dar Permisos?" : "Borrar Permisos?"}>
        <Checkbox
          checked={checked}
          onChange={checked ? grantPermissions : deletePermissions}
          size="small"
        />
      </Tooltip>
      <Tooltip title="Eliminar Permisos">
        <IconButton color="error" onClick={deleteCol}>
          <DeleteOutline fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CheckNDelete;
