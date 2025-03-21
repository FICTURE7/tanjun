import React from "react";
import ToolbarSearchField from "./ToolbarSearchField";
import ToolbarCreateButton from "./ToolbarCreateButton";

const Toolbar: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <ToolbarSearchField />
      <div style={{ marginLeft: '1rem' }}>
        <ToolbarCreateButton />
      </div>
    </div>
  );
}

export default Toolbar;
