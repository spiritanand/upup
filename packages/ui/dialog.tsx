"use client";

import * as RadixDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

function Dialog({
  trigger,
  dialogTitle,
  submitText,
  dialogDescription,
  inputFields,
  onSubmit,
  openModal,
  setOpenModal,
}: {
  trigger: React.ReactNode;
  dialogTitle: string;
  dialogDescription: string;
  submitText: string;
  inputFields: React.ReactNode;
  onSubmit: () => Promise<void>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <RadixDialog.Root onOpenChange={setOpenModal} open={openModal}>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black" />
        <RadixDialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <RadixDialog.Title className="m-0 text-[17px] font-medium">
            {dialogTitle}
          </RadixDialog.Title>
          <RadixDialog.Description className="text-mauve11 mb-5 mt-[10px] text-[15px] leading-normal">
            {dialogDescription}
          </RadixDialog.Description>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              void onSubmit();
            }}
          >
            {inputFields}
            <div className="mt-[25px] flex justify-end">
              <button
                className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-cyan-100 px-[15px] font-medium leading-none text-cyan-500 hover:bg-cyan-200 hover:text-cyan-600 focus:shadow-[0_0_0_2px] focus:shadow-cyan-600 focus:outline-none"
                type="submit"
              >
                {submitText}
              </button>
            </div>
          </form>
          <RadixDialog.Close asChild>
            <button
              aria-label="Close"
              className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-red-500 hover:bg-red-200 focus:shadow-[0_0_0_2px] focus:shadow-red-600 focus:outline-none"
              type="button"
            >
              <Cross2Icon height={20} width={20} />
            </button>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

export { Dialog };
