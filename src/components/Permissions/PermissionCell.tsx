import { useState } from "react";

import {
  Box,
  capitalize,
  Typography,
} from "@mui/material";

import { IRole } from "../../interfaces";
import { deletePermissionsCol, grantPermissionsCol } from "../../utils";
import CheckNDelete from "../ui/CheckNDelete";

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
    <Box
      display="flex"
      alignItems="center"
      onMouseLeave={() => setMouseOver(false)}
      sx={{ cursor: "pointer"}}
    >
      <Typography variant="body2" fontWeight='bold' onMouseOver={() => setMouseOver(true)}>
        {capitalize(permissionName.toLowerCase())}
      </Typography>
      
      {mouseOver && (
        <CheckNDelete
          checked={checked}
          deleteCol={deletePermission}
          grantPermissions={onGrantPermissionsCol}
          deletePermissions={onDeletePermissionsCol}
        />
      )}
    </Box>
  );
};

export default PermissionCell;
