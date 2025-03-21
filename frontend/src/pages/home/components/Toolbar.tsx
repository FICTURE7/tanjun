import React from "react";
import ToolbarSearchField from "./ToolbarSearchField";
import ToolbarCreateButton from "./ToolbarCreateButton";

const Toolbar: React.FC = () => {
  return (
    <div className="flex">
      <ToolbarSearchField />
      <div className="ml-4">
        <ToolbarCreateButton />
      </div>
    </div>
  );
}

export default Toolbar;
