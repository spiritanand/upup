import AmaApplication from "./AmaApplication";

function AMA({ params }: { params: { roomId: string } }) {
  const roomId = params.roomId;

  return (
    <main>
      <AmaApplication roomId={roomId} />
    </main>
  );
}

export default AMA;
