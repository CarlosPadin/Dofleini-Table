import axios from "axios";

import { IRole } from "../interfaces";
import mongoose from "mongoose";


const API_URL = process.env.DOFLEINI_API_URL;

export const createRoles = async (roles: IRole[]) => {
  try {
    // const response = await axios.post(`${API_URL}/roles`, roles);
    console.log(roles)
    // return response.data;
  } catch (error) {
    console.error("Error al crear los roles:", error);
    throw error;
  }
};

export const updateRoles = async (updatedRoles: IRole[]) => {
  try {
    // Convertir los IDs a IDs de MongoDB
    const rolesWithMongoIds = updatedRoles.map(role => ({
      ...role,
      id: new mongoose.Types.ObjectId(role.id)
    }));
    
    // const response = await axios.put(`${API_URL}/roles`, rolesWithMongoIds);
    console.log(rolesWithMongoIds);
    // return response.data;
  } catch (error) {
    console.error("Error al actualizar los roles:", error);
    throw error;
  }
};

export const deleteRoles = async (ids: string[]) => {
  try {
    await Promise.all(
      ids.map((id) => axios.delete(`${API_URL}/roles/${id}`))
    );
  } catch (error) {
    console.error("Error al eliminar los usuarios:", error);
    throw error;
  }
};

export const deleteRole = async (id: string) => {
  try {
    // await axios.delete(`${API_URL}/roles/${id}`);
    console.log(id);
  } catch (error) {
    console.error("Error al eliminar los usuarios:", error);
    throw error;
  }
};
