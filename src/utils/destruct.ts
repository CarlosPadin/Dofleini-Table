

export const destruct = (permissionChain: string) => {

    const permissionDestruct = permissionChain.split(':');

    return {
        entity    : permissionDestruct[0],
        permission: permissionDestruct[1],
    }
}


