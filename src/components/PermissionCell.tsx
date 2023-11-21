import { useState } from "react";

import {
  Box,
  capitalize,
  Checkbox,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";

import { IRole } from "../interfaces";
import { deletePermissionsCol, grantPermissionsCol } from "../utils";

interface Props {
  headerName: string;
  field: string;
  roles: IRole[];
  permissions: string[];

  // Methods
  onRolesUpdate: (updatedRoles: IRole[]) => void;
  onPermissionsUpdate: (updatedPermissions: string[]) => void;
}

const PermissionCell = ({
  headerName,
  field,
  roles,
  permissions,
  onRolesUpdate,
  onPermissionsUpdate,
}: Props) => {
  const [checked, setChecked] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  const onDeletePermissionsCol = () => {
    setChecked(!checked);
    const updatedRoles = deletePermissionsCol(roles, field);
    onRolesUpdate(updatedRoles);
  };

  const onGrantPermissionsCol = () => {
    setChecked(!checked);
    const updatedRoles = grantPermissionsCol(roles, field);
    onRolesUpdate(updatedRoles);
  };

  const deletePermission = () => {
    const updatedPermissions = permissions.filter(
      (permission) => permission !== field
    );
    onPermissionsUpdate(updatedPermissions);
  };

  const permissionName = headerName.replace(/_/g, " ");

  return (
    <Box display="flex" alignItems="center" onMouseLeave={() => setMouseOver(false)} >
      <Typography
        variant="body2"
        onMouseOver={() => setMouseOver(true)}
      >
        {capitalize(permissionName.toLowerCase())}
      </Typography>
      {mouseOver && (
        <Box>
          <Tooltip title={checked ? "Dar Permisos?" : "Borrar Permisos?"}>
            <Checkbox
              checked={checked}
              onChange={
                checked ? onGrantPermissionsCol : onDeletePermissionsCol
              }
              size="small"
            />
          </Tooltip>
          <Tooltip title="Eliminar Permisos">
            <IconButton color="error" onClick={deletePermission}>
              <DeleteOutline fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default PermissionCell;
