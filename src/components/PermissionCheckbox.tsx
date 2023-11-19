import { useState } from "react";

import { Checkbox, Tooltip, Typography } from "@mui/material";

import { IRole } from "../interfaces";
import { deletePermissionsCol, grantPermissionsCol } from "../utils";

interface Props {
  headerName: string;
  field     : string;
  roles     : IRole[];

  // Methods
  onRolesUpdate: (updatedRoles: IRole[]) => void;
}

const PermissionCheckbox = ({
  headerName,
  field,
  roles,
  onRolesUpdate,
}: Props) => {
  const [checked, setChecked] = useState(false);

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

  return (
    <>
      <Typography variant="body2">{headerName}</Typography>
        <Tooltip title={checked ? "Dar Permisos?" : "Borrar Permisos?"}>
          <Checkbox
            checked={checked}
            onChange={checked ? onGrantPermissionsCol : onDeletePermissionsCol}
            size="small"
          />
        </Tooltip>
    </>
  );
};

export default PermissionCheckbox;
