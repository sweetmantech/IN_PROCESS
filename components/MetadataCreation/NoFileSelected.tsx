import Image from "next/image";
import { useRouter } from "next/navigation";

const NoFileSelected = ({ onClick }: { onClick: () => void }) => {
  const { push } = useRouter();
  return (
    <div className="size-full flex flex-col items-center justify-center gap-6">
      <button type="button" onClick={onClick}>
        <Image
          src={"/upload-imagination.png"}
          width={201}
          height={187}
          alt="upload imagination"
        />
      </button>
      <p className="font-archivo text-md text-center">
        drop an image, video, pdf, link, or embed
      </p>
      <button
        className="border border-black py-1 px-12 font-archivo text-xl"
        type="button"
        onClick={() => push("/create?writing_mode=enabled")}
      >
        Create
      </button>
    </div>
  );
};

export default NoFileSelected;
