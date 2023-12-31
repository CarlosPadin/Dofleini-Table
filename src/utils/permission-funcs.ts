import { IRole } from "../interfaces";

export const deletePermissionsRow = (id: string, roles: IRole[]) => {
  const roleIndex = roles.findIndex((role) => role.id === id);
  if (roleIndex !== -1) {
    const roleCopy = { ...roles[roleIndex] };
    roleCopy.permissions = [];
    roles[roleIndex] = roleCopy;
  }

  return [...roles];
};

export const grantPermissionsRow = (
  id         : string,
  roles      : IRole[],
  permissions: string[]
) => {
  const roleIndex = roles.findIndex((role) => role.id === id);
  if (roleIndex !== -1) {
    const roleCopy = { ...roles[roleIndex] };
    roleCopy.permissions = permissions;
    roles[roleIndex] = roleCopy;
  }

  return [...roles];
};

export const deletePermissionsCol = (roles: IRole[], desc: string) => {
  return roles.map((role) => {
    role.permissions.forEach((perm, idx) => {
      if (perm === desc) {
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

// ------ENTITIES------
export const deletePermissionEntity = (roles: IRole[], entityName: string): IRole[] => {
  const updRoles = roles.map((role) => {
    return {
      ...role,
      permissions: role.permissions.filter((perm) => !perm.includes(entityName)),
    };
  });
  return updRoles;
  
};

export const grantPermissionEntity = (
  roles      : IRole[],
  permissions: string[],
  entity     : string
) => {
  const newPermissons: string[] = permissions.filter((perm) =>
    perm.includes(entity)
  );

  const updtRoles = roles.map((role) => {
    role.permissions.push(...role.permissions, ...newPermissons);
    return role;
  });

  return updtRoles;
};
