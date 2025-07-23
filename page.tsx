export default function RifaPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      <h1>Rifa: {id}</h1>
    </div>
  );
}
