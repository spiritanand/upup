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
  const bgColor = variant === "primary" ? "bg-cyan-500" : "bg-yellow-500";

  return (
    <button
      className={cn(`rounded-full p-4 ${bgColor} ${className}`)}
      disabled={disabled}
      onClick={onClick}
      type={type === "button" ? "button" : "submit"}
    >
      {children}
    </button>
  );
}
