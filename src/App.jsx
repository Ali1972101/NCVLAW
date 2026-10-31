import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Lawyer from "./Pages/Lawyer";
import Servicespage from "./Pages/Servicespage";
import Business from "./Pages/Business";
import Family from "./Pages/Family";
import Realestate from "./Pages/Realestate";
import Wills from "./Pages/Wills";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Team from "./Pages/Team";
// import Business from "./Pages/Business";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lawyer" element={<Lawyer />} />
        <Route path="/servicepage" element={<Servicespage />} />
        <Route path="/business" element={<Business />} />
        <Route path="/family" element={<Family />} />
        <Route path="/realestate" element={<Realestate />} />
        <Route path="/wills" element={<Wills />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
        {/* <Route path="/business" element={<Business />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
