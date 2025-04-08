import Arweave from "arweave";

const arweave = Arweave.init({});

const clientUploadToArweave = async (file: File): Promise<string> => {
  const ARWEAVE_KEY = JSON.parse(
    Buffer.from(
      process.env.NEXT_PUBLIC_ARWEAVE_KEY as string,
      "base64",
    ).toString(),
  );
  const buffer = await file.arrayBuffer();

  const transaction = await arweave.createTransaction(
    {
      data: buffer,
    },
    ARWEAVE_KEY,
  );
  transaction.addTag("Content-Type", file.type);
  await arweave.transactions.sign(transaction, ARWEAVE_KEY);
  const uploader = await arweave.transactions.getUploader(transaction);

  while (!uploader.isComplete) {
    console.log(
      `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`,
    );
    await uploader.uploadChunk();
  }

  return `ar://${transaction.id}`;
};

export default clientUploadToArweave;
