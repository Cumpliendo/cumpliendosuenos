import { Metadata } from "next";

type Props = {
  params: {
    id: string;
  };
};

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `Rifa ${params.id}`,
  };
}

export default function RifaPage({ params }: Props) {
  const { id } = params;

  return (
    <div>
      <h1>Detalles de la rifa {id}</h1>
    </div>
  );
}
