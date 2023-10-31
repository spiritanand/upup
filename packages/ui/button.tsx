import { cn } from "./cn";

export function Button({
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  children,
}: {
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  const bgColor =
    variant === "primary"
      ? "from-cyan-500 to-teal-500 hover:from-teal-500 hover:to-cyan-500 hover:ring-cyan-500 text-gray-200"
      : "from-yellow-500 to-amber-500 hover:from-amber-500 hover:to-yellow-500 hover:ring-yellow-500 text-gray-700";

  return (
    <button
      className={cn(
        `rounded-full p-4 font-semibold ${className}
        bg-gradient-to-r ${bgColor}
        transition-all duration-300 ease-out
        hover:ring-2 hover:ring-offset-2
        active:ring-4
        `,
      )}
      disabled={disabled}
      onClick={onClick}
      type={type === "button" ? "button" : "submit"}
    >
      {children}
    </button>
  );
}
