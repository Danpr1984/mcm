import React, { useState } from "react";
import UserContext from "./UserContext.jsx";
import Routing from "./routes/Routing.jsx";

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routing />
    </UserContext.Provider>
  );
}

export default App;
