import React from "react";
import ToolbarSearchField from "./ToolbarSearchField";
import ToolbarCreateButton from "./ToolbarCreateButton";

export interface ToolbarProps {
  onSearch?: (value: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onSearch }) => {
  return (
    <div className="flex">
      <ToolbarSearchField onChange={onSearch} />
      <div className="ml-4">
        <ToolbarCreateButton />
      </div>
    </div>
  );
}

export default Toolbar;
