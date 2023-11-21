import { useEffect, useState } from "react";

import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
  GridColumnHeaderParams,
} from "@mui/x-data-grid";
import { Box, Button, IconButton, Modal } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import {
  RoleCell,
  PermissionCell,
  PermissionForm,
  RoleForm,
} from "./components";
import { IRole } from "./interfaces";
import { columnsProps, destruct } from "./utils";

interface Props {
  roles: IRole[];
  permissions: string[];
}

const App = ({
  roles: initialRoles,
  permissions: initialPermissions,
}: Props) => {
  const [roles, setRoles] = useState(initialRoles);
  const [permissions, setPermissions] = useState(initialPermissions);
  const [newPermissionOpen, setNewPermissionOpen] = useState(false);
  const [newRoleOpen, setNewRoleOpen] = useState(false);

  useEffect(() => {
    setRoles(initialRoles);
    setPermissions(initialPermissions.sort());
  }, [initialRoles, initialPermissions]);

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
      width: 170,
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
          onRolesUpdate={onUpdateRoles}
          permissions={permissions}
          onPermissionsUpdate={onUpdatePermissions}
        />
      );
    };
  });
  columns.push(...colProps);

  // Columna de agregar permisos
  const lastColumn: GridColDef = {
    field: "addColButton",
    headerName: "",
    width: 60,
    sortable: false,
    renderHeader: () => {
      return (
        <IconButton color="primary" onClick={() => setNewPermissionOpen(true)}>
          <AddCircleOutlineIcon />
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

  // todo: agrupar columnas
  // const columnGroupingModel: GridColumnGroupingModel = [
  //   {
  //     groupId: "Roles",
  //     headerName: '',
  //     children: [{ field: "role" }],
  //   },
  // ];
  // columnGroupingModel.push(...colModelProps);

  return (
    <Box mt="20px" mx="10px">
      <div style={{ height: 500, width: "100%" }}>
        <Button
          variant="contained"
          disableElevation
          onClick={() => {
            setNewRoleOpen(true);
          }}
        >
          Add Role
        </Button>
        <DataGrid
          rows={initialRows}
          columns={columns}
          disableColumnMenu
          disableColumnFilter
          disableRowSelectionOnClick
        />

        <Modal
          open={newPermissionOpen}
          onClose={() => setNewPermissionOpen(false)}
        >
          <PermissionForm
            permissions={permissions}
            onCloseModal={() => setNewPermissionOpen(false)}
          />
        </Modal>

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
      </div>
    </Box>
  );
};

export default App;
