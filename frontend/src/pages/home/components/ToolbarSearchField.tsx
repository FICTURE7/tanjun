import { ChangeEvent } from "react";

export interface ToolbarSearchProps {
  value?: string;
  onChange?: (value: string) => void;
}

const ToolbarSearchField: React.FC<ToolbarSearchProps> = ({ value, onChange }) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    if (onChange) {
      onChange(event.target.value);
    }
  }

  return (
    <div className='flex-grow-1'>
      <input className='bg-white text-black w-full p-4 rounded-full border-2 text-xl h-16' type='input' placeholder='Search' value={value} onChange={handleChange} />
    </div>
  );
}

export default ToolbarSearchField;
