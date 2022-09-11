interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  createdAt: number;
  status: string;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "description 1",
      createdAt: Date.now(),
      status: "Pendiente",
    },
    {
      description: "description 2",
      createdAt: Date.now(),
      status: "En Progreso",
    },
    {
      description: "description 3",
      createdAt: Date.now(),
      status: "Completado",
    },
    {
      description: "description 3",
      createdAt: Date.now(),
      status: "Completado",
    },
  ],
};
