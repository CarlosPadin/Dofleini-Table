import { useEffect, useRef, useState } from "react";

import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
  GridColumnHeaderParams,
  GridColumnGroupingModel,
  GridColumnGroupHeaderParams,
} from "@mui/x-data-grid";
import { Box, Button, IconButton, Modal } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import './styles/globals.css';
import {
  RoleCell,
  PermissionCell,
  PermissionForm,
  RoleForm,
  EntityCell,
} from "./components";
import { IRole } from "./interfaces";
import { columnsModelProperties, columnsProps, destruct } from "./utils";
import { createRoles, updateRoles } from "./api";

interface Props {
  roles: IRole[];
  permissions: string[];
}

const App = ({
  roles: initialRoles,
  permissions: initialPermissions,
}: Props) => {
  const [roles, setRoles] = useState(initialRoles);
  const [permissions, setPermissions] = useState([...initialPermissions].sort());
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

  // --------AGRUPAR COLUMNAS-------
  const columnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: "Roles",
      headerName: "",
      children: [{ field: "role" }],
    },
  ];
  const columnsModelProps: GridColumnGroupingModel = columnsModelProperties(permissions);
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
      )
    }
  })
  columnGroupingModel.push(...columnsModelProps!);

  const saveHandler = () => updateRoles(roles);

  return (
    <Box mt="5%" mx="10%">
      <div style={{ height: 350, width: "100%" }}>
        <Button
          variant="contained"
          disableElevation
          onClick={() => {setNewRoleOpen(true)}}
        >
          Add Role
        </Button>
        <DataGrid
          rows={initialRows}
          columns={columns}
          experimentalFeatures={{ columnGrouping: true }}
          columnGroupingModel={columnGroupingModel}
          disableColumnMenu
          disableColumnFilter
          disableRowSelectionOnClick
        />
        <Button 
          fullWidth 
          variant="contained" 
          disableElevation 
          onClick={saveHandler}
        >
          Salvar
        </Button>

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
