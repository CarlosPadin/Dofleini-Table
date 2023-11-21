import { IRole } from "../interfaces";

export const Roles: IRole[] = [
    {
        id: '1',
        name: 'admin',
        permissions: [
            'PROJECT:WRITE',
            'STORE:READ',
            'ACCOUNT:READ_ACCESS',
        ]
    },
    {
        id: '2',
        name: 'client',
        permissions: [
            'PROJECT:READ',
            'STORE:READ',
            'ACCOUNT:READ_ACCESS',
        ]
    },
    {
        id: '3',
        name: 'manager',
        permissions: [
            'PROJECT:WRITE',
            'STORE:WRITE',
            'ACCOUNT:READ_ACCESS',
        ]
    }
];

export const Permissions: string[] = [
    'PROJECT:WRITE',
    'PROJECT:READ',
    'STORE:WRITE',
    'STORE:READ',
    'ACCOUNT:GRANT_ACCESS',
    'ACCOUNT:READ_ACCESS',
]