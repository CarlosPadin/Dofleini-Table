import { useEffect, useRef, useState } from "react";

import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
  GridColumnHeaderParams,
  GridColumnGroupingModel,
  GridColumnGroupHeaderParams,
  GridCellParams,
} from "@mui/x-data-grid";
import { Box, Button, IconButton, Modal } from "@mui/material";
import { AddCircleOutlined, Close } from "@mui/icons-material";

import {
  RoleCell,
  PermissionCell,
  PermissionForm,
  RoleForm,
  EntityCell,
} from "./";
import { IRole } from "../interfaces";
import { columnsModelProperties, columnsProps, destruct } from "../utils";
import { createRoles, updateRoles } from "../api";

interface Props {
  roles: IRole[];
  permissions: string[];
}

const DofleiniTable = ({
  roles: initialRoles,
  permissions: initialPermissions,
}: Props) => {
  const [roles, setRoles] = useState(initialRoles);
  const [permissions, setPermissions] = useState(
    [...initialPermissions].sort()
  );
  const [newPermissionOpen, setNewPermissionOpen] = useState(false);
  const [newRoleOpen, setNewRoleOpen] = useState(false);

  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      createRoles(roles);
      hasRun.current = true;
    }
  }, [roles]);

  // --------DEFINIR FILAS--------
  const initialRows: GridRowsProp = roles.map((role) => {
    let row: { id: string; role: string; [key: string]: any } = {
      id: role.id,
      role: role.name,
    };

    // Crear filas con nombres dinamicos
    role.permissions.forEach((perm) => {
      const { entity, permission } = destruct(perm);
      row[entity + permission.toLowerCase()] = "X";
    });

    return row;
  });

  // --------DEFINIR COLUMNAS-------
  // Columna de Roles
  const columns: GridColDef[] = [
    {
      field: "role",
      headerName: "Roles",
      width: 180,
      headerClassName: "headerCell",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <RoleCell
            roleName={params.row.role}
            id={params.row.id}
            roles={roles}
            permissions={permissions}
            onRolesUpdate={onUpdateRoles}
          />
        );
      },
    },
  ];

  // Columnas de permisos
  const colProps = columnsProps(permissions);
  colProps.forEach((col) => {
    col.renderHeader = (params: GridColumnHeaderParams) => {
      return (
        <PermissionCell
          headerName={col.headerName!}
          field={params.colDef.description!}
          roles={roles}
          permissions={permissions}
          onRolesUpdate={onUpdateRoles}
          onPermissionsUpdate={onUpdatePermissions}
        />
      );
    };
    col.renderCell = (params: GridCellParams) => {
      if (params.value === "X") {
        return <Close color="primary" />;
      }
      return !params.value;
    };
  });
  columns.push(...colProps);

  // Columna de agregar permisos
  const lastColumn: GridColDef = {
    field: "addColButton",
    headerName: "",
    width: 60,
    sortable: false,
    headerClassName: "headerCell",
    renderHeader: () => {
      return (
        <IconButton color="primary" onClick={() => setNewPermissionOpen(true)}>
          <AddCircleOutlined fontSize="large" />
        </IconButton>
      );
    },
  };
  columns.push(lastColumn);

  const onUpdateRoles = (updatedRoles: IRole[]) => {
    setRoles([...updatedRoles]);
  };

  const onUpdatePermissions = (updatedPermissions: string[]) => {
    setPermissions([...updatedPermissions]);
  };

  // --------AGRUPAR COLUMNAS-------
  const columnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: "Roles",
      headerName: "",
      children: [{ field: "role" }],
    },
  ];
  const columnsModelProps: GridColumnGroupingModel =
    columnsModelProperties(permissions);
  columnsModelProps.forEach((col) => {
    col.renderHeaderGroup = (params: GridColumnGroupHeaderParams) => {
      return (
        <EntityCell
          roles={roles}
          permissions={permissions}
          entity={params.headerName!}
          onPermissionsUpdate={onUpdatePermissions}
          onRolesUpdate={onUpdateRoles}
        />
      );
    };
  });
  columnGroupingModel.push(...columnsModelProps!);

  const saveHandler = () => updateRoles(roles);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}
    >
      <Button
        variant="contained"
        onClick={saveHandler}
        sx={{ borderRadius: "2px", my: 1 }}
      >
        Salvar
      </Button>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={initialRows}
          columns={columns}
          experimentalFeatures={{ columnGrouping: true }}
          columnGroupingModel={columnGroupingModel}
          disableColumnMenu
          disableColumnFilter
          disableRowSelectionOnClick
          sx={{ borderRadius: "2px" }}
        />
      </Box>
      <Button
        variant="contained"
        fullWidth
        onClick={() => {
          setNewRoleOpen(true);
        }}
        sx={{ borderRadius: "2px", my: 1, width: "100%" }}
        startIcon={<AddCircleOutlined />}
      >
        Añadir Role
      </Button>

      {/* MODAL DE PERMISOS */}
      <Modal
        open={newPermissionOpen}
        onClose={() => setNewPermissionOpen(false)}
      >
        <PermissionForm
          permissions={permissions}
          onCloseModal={() => setNewPermissionOpen(false)}
        />
      </Modal>

      {/* MODAL DE ROLES */}
      <Modal
        open={newRoleOpen}
        onClose={() => {
          setNewRoleOpen(false);
        }}
      >
        <RoleForm
          permissions={permissions}
          roles={roles}
          onCloseModal={() => setNewRoleOpen(false)}
        />
      </Modal>
    </Box>
  );
};

export default DofleiniTable;
