import { useEffect, useState } from "react";

import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
  GridColumnHeaderParams,
} from "@mui/x-data-grid";
import { Box, IconButton, Typography } from "@mui/material";
import { Block, HowToReg, RadioButtonChecked } from "@mui/icons-material";

import { IRole } from "./interfaces";
import { columnsProps, destruct } from "./utils";

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
      row[entity[0] + permission.toLowerCase()] = "X";
    });

    return row;
  });

  // --------DEFINIR COLUMNAS-------
  const columns: GridColDef[] = [
    {
      field: "role",
      headerName: "Role",
      width: 80,
    },
    {
      field: "delete",
      headerName: "",
      width: 50,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
            <IconButton onClick={() => onDeletePermissions(params.row.id)}>
              <Block fontSize="small"/>
            </IconButton>
        );
      },
    },
    {
      field: "grant",
      headerName: "",
      width: 50,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
            <IconButton onClick={() => onGrantPermissions(params.row.id)}>
              <HowToReg fontSize="small"/>
            </IconButton>
        );
      },
    },
  ];
  const colProps = columnsProps(permissions);

  colProps.forEach(col => {
    col.renderHeader = (params: GridColumnHeaderParams) => {
      return(
        <>
        <Typography variant="button">{col.headerName}</Typography>
        <IconButton>
          <RadioButtonChecked fontSize='small'/>
        </IconButton>
        </>
      )
    }
  })
  columns.push(...colProps);


  // ---------FUNCIONES DE PERMISOS----------
  const onDeletePermissions = (id: string) => {
    const role = roles.find((role) => role.id === id);
      if (role) {
        role.permissions = [];
      }
    setRoles([...roles]);
  };
  const onGrantPermissions = (id: string) => {
      const role = roles.find((role) => role.id === id);
      if (role) {
        role.permissions = permissions;
      }
    setRoles([...roles]);
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
    <Box mt="10px" mx="10px">
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          experimentalFeatures={{ columnGrouping: true }}
          disableRowSelectionOnClick
          disableColumnMenu
          disableColumnFilter

          // componentsProps={{
          //   row: {
          //     onMouseEnter: () => setCheckBoxAppear(true),
          //     onMouseLeave: () => setCheckBoxAppear(false),
          //   }
          // }}
        />
      </div>
    </Box>
  );
};

export default App;
