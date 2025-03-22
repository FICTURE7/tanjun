import { ChangeEvent } from "react";
import { BsSearch } from "react-icons/bs";

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
    <div className='flex flex-grow-1 select-none'>
      <div className="h-16 w-16 flex justify-center items-center border-2 border-e-0 rounded-s-full">
        <BsSearch className="opacity-50 inline text-2xl"/>
      </div>
      <input className='bg-white text-black w-full py-4 px-0 outline-0 rounded-e-full border-2 border-s-0 text-xl h-16' type='input' placeholder='Search' value={value} onChange={handleChange} />
    </div>
  );
}

export default ToolbarSearchField;
