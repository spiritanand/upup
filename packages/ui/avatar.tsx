import * as RadixAvatar from "@radix-ui/react-avatar";

function Avatar({
  fallback,
  src,
  alt,
}: {
  fallback: string;
  src: string;
  alt: string;
}) {
  return (
    <div className="flex gap-5">
      <RadixAvatar.Root className="bg-blackA1 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
        <RadixAvatar.Image
          alt={alt}
          className="h-full w-full rounded-[inherit] object-cover"
          src={src}
        />
        <RadixAvatar.Fallback
          className="leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
          delayMs={600}
        >
          {fallback}
        </RadixAvatar.Fallback>
      </RadixAvatar.Root>
    </div>
  );
}

export { Avatar };
