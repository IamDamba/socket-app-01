// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { useState, useEffect } from "react";

// ||||||||||||||||||||||||||||| Main_Layout Component ||||||||||||||||||||||||||||||||||||

const Main_Layout = () => {
  // Hooks
  const [val, setVal] = useState();

  // Functions
  useEffect(() => {
    // Enter some content here.
  }, []);

  // Return
  return (
    <div>
      <p>Hello World</p>
    </div>
  );
};
export default Main_Layout;
