import mongoose from "mongoose";

/**
 * 0 - Disconnected
 * 1 - Connected
 * 2 - Connecting
 * 3 - Disconnecting
 */

const mongoConnection = {
  isConnected: 0,
};

export const ConnectDb = async () => {
  try {
    if (mongoConnection.isConnected)
      return console.log("Ya estamso conectados");

    if (mongoose.connections.length > 0) {
      mongoConnection.isConnected = mongoose.connections[0].readyState;

      if (mongoConnection.isConnected === 1)
        return console.log("Usando conexion existente");

      await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGO_URL || "");
    mongoConnection.isConnected = 1;
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log("Error al desconectar", error);
  }
};

export const DisconnectDb = async () => {
  if (process.env.NODE_ENV === "development") return;
  if (mongoConnection.isConnected === 0) return;

  return await mongoose
    .disconnect()
    .then(() => console.log("Desconectado de la base de datos"));
};
