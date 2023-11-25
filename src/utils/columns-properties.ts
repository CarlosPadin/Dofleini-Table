import { GridColDef, GridColumnGroupingModel } from "@mui/x-data-grid";

import { destruct } from ".";

export const columnsProps = (permissionsArray: string[]) => {
  let columnsProps: GridColDef[] = [];

  for (let i = 0; i <= permissionsArray.length - 1; i++) {
    const { entity, permission } = destruct(permissionsArray[i]);

    columnsProps.push({
      field: entity + permission.toLowerCase(),
      headerName: permission,
      headerClassName: 'headerCell',
      headerAlign: "center",
      align: "center",
      description: permissionsArray[i],
      width: 180,
      sortable: false,
      editable: true,
    });
  }

  return columnsProps;
};

export const columnsModelProperties = (permissionsArray: string[]) => {
  let columnsModelProps: GridColumnGroupingModel = [];

  for (let i = 0; i <= permissionsArray.length - 1; i++) {
    const { entity, permission } = destruct(permissionsArray[i]);

    let index = columnsModelProps.findIndex(
      (prop) => prop.groupId === entity.toLowerCase()
    );
    if (index !== -1) {
      columnsModelProps[index].children.push({
        field: entity + permission.toLowerCase(),
        description: entity + ":" + permission,
        headerAlign: 'center',
      });
    } else {
      columnsModelProps.push({
        groupId: entity.toLowerCase(),
        headerName: entity,
        headerClassName: 'headerCell',
        headerAlign: 'center',
        children: [
          {
            field: entity + permission.toLowerCase(),
            description: entity + ":" + permission,
          },
        ],
        
      });
    }
  }

  return columnsModelProps;
};
