type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { id } = params;

  // Aquí puedes hacer tu lógica para obtener los datos
  const data = await getDataById(id);

  return (
    <main>
      <h1>Rifa ID: {id}</h1>
      {/* Renderiza lo que necesites con los datos */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}

// Esta función es solo un ejemplo. Sustitúyela por tu lógica real.
async function getDataById(id: string) {
  return {
    id,
    nombre: "Ejemplo de Rifa",
    estado: "Activa"
  };
}
