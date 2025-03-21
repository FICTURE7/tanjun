import { ChangeEvent } from "react";

import '../../../components/TextField.css';
import './ToolbarSearchField.css';

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
    <div style={{ flexGrow: '1' }}>
      <input className='text-field search-field' type='input' placeholder='Search' value={value} onChange={handleChange} />
    </div>
  );
}

export default ToolbarSearchField;
