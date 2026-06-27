import { SUGGESTIONS } from "./suggestions";

const SuggestionChips = ({
  onSelect,
  disabled,
}: {
  onSelect: (text: string) => void;
  disabled: boolean;
}) => (
  <div className="chat-chips">
    {SUGGESTIONS.map((s) => (
      <button
        key={s}
        type="button"
        className="chat-chip"
        disabled={disabled}
        onClick={() => onSelect(s)}
      >
        {s}
      </button>
    ))}
  </div>
);

export default SuggestionChips;
