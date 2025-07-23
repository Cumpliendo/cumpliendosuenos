type Props = {
  params: {
    id: string;
  };
};

export default async function RifaPage({ params }: Props) {
  const { id } = params;

  return (
    <div>
      <h1>Detalles de la rifa {id}</h1>
    </div>
  );
}
