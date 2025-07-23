interface PageProps {
  params: {
    id: string;
  };
}

export default function RifaPage({ params }: PageProps) {
  const { id } = params;

  return (
    <div>
      <h1>Rifa ID: {id}</h1>
      {/* Aquí puedes renderizar los detalles de la rifa usando el ID */}
    </div>
  );
}
