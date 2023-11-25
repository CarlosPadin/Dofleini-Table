import { useState } from "react";

import { Box, Typography, capitalize } from "@mui/material";
import { CheckNDelete } from "../ui";
import { IRole } from "../../interfaces";
import { deletePermissionEntity, grantPermissionEntity } from "../../utils";

interface Props {
  roles: IRole[];
  permissions: string[];
  entity: string,

  // Methods
  onRolesUpdate: (updatedRoles: IRole[]) => void;
  onPermissionsUpdate: (updatedPermissions: string[]) => void;
}

const EntityCell = ({
  roles,
  permissions,
  entity,
  onRolesUpdate,
  onPermissionsUpdate,
}: Props) => {
  const [checked, setChecked] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  const onDeletePermissionsEntity = () => {
    setChecked(!checked);
    const updatedRoles = deletePermissionEntity(roles, entity);
    onRolesUpdate(updatedRoles);
  };

  const onGrantPermissionsEntity = () => {
    setChecked(!checked);
    const updatedRoles = grantPermissionEntity(roles, permissions, entity);
    onRolesUpdate(updatedRoles);
  };

  const deletePermissions = () => {
    const updatedPermissions = permissions.filter(
      (permission) => !permission.includes(entity) );
    onPermissionsUpdate(updatedPermissions);
  };


  return (
    <Box
      display="flex"
      alignItems="center"
      onMouseLeave={() => setMouseOver(false)}
      sx={{ cursor: "pointer"}}
    >
      <Typography variant="body2" fontWeight='bold' onMouseOver={() => setMouseOver(true)}>
        {capitalize(entity.toLowerCase())}
      </Typography>

      {mouseOver && (
        <CheckNDelete
          checked={checked}
          deleteCol={deletePermissions}
          deletePermissions={onDeletePermissionsEntity}
          grantPermissions={onGrantPermissionsEntity}
        />
      )}
    </Box>
  );
};

export default EntityCell;
