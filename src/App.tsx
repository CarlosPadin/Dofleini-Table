import { useEffect, useState } from "react";

import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
  GridColumnHeaderParams,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";

import { IRole } from "./interfaces";
import { columnsProps, destruct } from "./utils";
import { RoleCell, PermissionCheckbox } from "./components";

interface Props {
  roles: IRole[];
  permissions: string[];
}

const App = ({ roles: initialRoles, permissions }: Props) => {
  const [roles, setRoles] = useState(initialRoles);

  useEffect(() => {
    setRoles(initialRoles);
  }, [initialRoles]);

  // --------DEFINIR FILAS--------
  const rows: GridRowsProp = roles.map((role) => {
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
  const colProps = columnsProps(permissions);

  colProps.forEach((col) => {
    col.renderHeader = (params: GridColumnHeaderParams) => {
      return (
        <PermissionCheckbox
          headerName={col.headerName!}
          field={params.colDef.description!}
          roles={roles}
          onRolesUpdate={onUpdateRoles}
        />
      );
    };
  });
  columns.push(...colProps);

  const onUpdateRoles = (updatedRoles: IRole[]) => {
    setRoles([...updatedRoles]);
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
        <DataGrid
          rows={rows}
          columns={columns}
          experimentalFeatures={{ columnGrouping: true }}
          disableColumnMenu
          disableColumnFilter
          disableRowSelectionOnClick
        />
      </div>
    </Box>
  );
};

export default App;
