
import RifaDetail from './RifaDetail';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default function RifaPage({ params }: { params: { id: string } }) {
  return <RifaDetail rifaId={params.id} />;
}
