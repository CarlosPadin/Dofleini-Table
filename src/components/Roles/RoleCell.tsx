import { useState } from "react";

import { Block, DeleteOutline, HowToReg } from "@mui/icons-material";
import {
  Box,
  capitalize,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import { IRole } from "../../interfaces";
import { deletePermissionsRow, grantPermissionsRow } from "../../utils";

interface Props {
  roleName: string;
  id: string;
  roles: IRole[];
  permissions: string[];

  // Methods
  onRolesUpdate: (updatedRoles: IRole[]) => void;
}

const RoleCell = ({
  roleName,
  id,
  roles,
  permissions,
  onRolesUpdate,
}: Props) => {
  const [checked, setChecked] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  const onDeletePermissionsRow = () => {
    setChecked(!checked);
    const updatedRoles = deletePermissionsRow(id, roles);
    onRolesUpdate(updatedRoles);
  };

  const onGrantPermissionsRow = () => {
    setChecked(!checked);
    const updatedRoles = grantPermissionsRow(id, roles, permissions);
    onRolesUpdate(updatedRoles);
  };

  const onDeleteRole = () => {
    const updatedRoles = roles.filter((role) => role.id !== id);
    onRolesUpdate(updatedRoles);
  };

  return (
    <Box onMouseLeave={() => setMouseOver(false)} display='flex' alignItems='center'>
      <Typography variant="body1" onMouseOver={() => setMouseOver(true)}>
        {capitalize(roleName)}
      </Typography>

      {mouseOver && (
        <Box className='fadeIn'>
          <Tooltip title="Dar Permisos">
            <IconButton color="primary" onClick={onGrantPermissionsRow}>
              <HowToReg fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Eliminar Permisos">
            <IconButton onClick={onDeletePermissionsRow}>
              <Block fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Eliminar Role">
            <IconButton color="error" onClick={onDeleteRole}>
              <DeleteOutline fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default RoleCell;
