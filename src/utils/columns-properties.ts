import {
  GridColDef,
  GridColumnGroupingModel,
} from "@mui/x-data-grid";
import { destruct } from ".";

export const columnsModelProperties = (permissionsArray: string[]) => {
  let columnsModelProps: GridColumnGroupingModel = [];

  for (let i = 0; i <= permissionsArray.length - 1; i++) {
    const { entity, permission } = destruct(permissionsArray[i]);

    let index = columnsModelProps.findIndex(
      (prop) => prop.groupId === entity.toLowerCase()
    );
    if (index !== -1) {
      //-1 indica que no encontro el indice
      columnsModelProps[index].children.push({
        field: permission.toLowerCase(),
      });
    } else {
      columnsModelProps.push({
        groupId: entity.toLowerCase(),
        headerName: entity.toLowerCase(),
        children: [{ field: entity + permission.toLowerCase() }],
      });
    }
  }

  return columnsModelProps;
};

export const columnsProps = (permissionsArray: string[]) => {
  let columnsProps: GridColDef[] = [];

  for (let i = 0; i <= permissionsArray.length - 1; i++) {
    const { entity, permission } = destruct(permissionsArray[i]);

    columnsProps.push({
      field: entity[0] + permission.toLowerCase(),
      headerName: entity[0] + ":" + permission.toLowerCase(),
      width: 180,
      sortable: false,
    });
  }

  return columnsProps;
};
