type FeederControlButtonProps = {
  label: string;
  active: boolean;
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
};

export function FeederControlButton({
  label,
  active,
  disabled,
  loading,
  onClick,
}: FeederControlButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => {
        if (!isDisabled) {
          onClick();
        }
      }}
      className={[
        "rounded-md px-2.5 py-2 text-[.52rem] font-black uppercase tracking-[.05em] transition disabled:cursor-not-allowed disabled:opacity-40",
        active
          ? label === "Open"
            ? "bg-[#d8ed75] text-[#26382f]"
            : "bg-[#26382f] text-[#f7f6ef]"
          : "border border-[#c7cec1] text-[#657267] hover:border-[#26382f]",
      ].join(" ")}
    >
      {loading ? "..." : label}
    </button>
  );
}
