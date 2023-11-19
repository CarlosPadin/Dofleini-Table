import { IRole } from "../interfaces";
import { destruct } from "./destruct";

export const deletePermissionsRow = (id: string, roles: IRole[]) => {
  const role = roles.find((role) => role.id === id);
  if (role) {
    role.permissions = [];
  }
  return [...roles];
};

export const grantPermissionsRow = (
  id: string,
  roles: IRole[],
  permissions: string[]
) => {

  const role = roles.find((role) => role.id === id);
  if (role) {
    role.permissions = permissions;
  }

  return [...roles];
};

export const deletePermissionsCol = (roles: IRole[], desc: string) => {

  return roles.map((role) => {
    role.permissions.forEach((perm, idx) => {
      const { entity, permission } = destruct(perm);
      const tempVal = entity + ":" + permission;
      if (tempVal === desc) {
        role.permissions.splice(idx, 1);
      }
    });

    return role;
  });
};

export const grantPermissionsCol = (roles: IRole[], desc: string) => {

  const updtRoles = roles.map((role) => {
    role.permissions.push(desc);
    return role;
  });
  
  return updtRoles;
};
