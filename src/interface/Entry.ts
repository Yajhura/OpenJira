export interface Entry {
  _id: string;
  description: string;
  createdAt: string;
  status: Status;
}



export type Status = "Pendiente" | "En Progreso" | "Completado";
export type AlertStatus = "success" | "error" | "info" | "warning";