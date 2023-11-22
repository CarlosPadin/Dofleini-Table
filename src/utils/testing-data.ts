import { IRole } from "../interfaces";

const mongoose = require('mongoose');

export const Roles: IRole[] = [
    {
        id: new mongoose.Types.ObjectId().toString(),
        name: 'admin',
        permissions: [
            'PROJECT:WRITE',
            'STORE:READ',
            'ACCOUNT:READ_ACCESS',
        ]
    },
    {
        id: new mongoose.Types.ObjectId().toString(),
        name: 'client',
        permissions: [
            'PROJECT:READ',
            'STORE:READ',
            'ACCOUNT:READ_ACCESS',
        ]
    },
    {
        id: new mongoose.Types.ObjectId().toString(),
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