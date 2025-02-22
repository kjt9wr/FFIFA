import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import NavBar from "./components/NavBar/NavBar";
const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        {/* <Route path="/roster/:name" component={Roster} /> */}
        {/* <Route path="/trade" component={TradeTracker} /> */}
        {/* <Route path="/tradepreview" component={RosterPreview} /> */}
        {/* <Route path="/cap/" component={CapTracker} /> */}
        {/* <Route path="/franchise" component={FranchiseTag} /> */}
        {/* <Route path="/fa" component={FreeAgency} /> */}
        {/* <Route path="/supermax" component={SuperMax} /> */}
        {/* <Route path="/arbitration" component={Arbitration} /> */}
        {/* <Route path="/draft" component={DraftDay} /> */}
        {/* <Route path="/admin" component={Admin} /> */}
      </Routes>
    </BrowserRouter>
  );
};

// return (

//     <BrowserRouter>
//       <Navbar />
//       <div className="pages">
//         <Routes>
//           <Route
//             path="/"
//             element={<Home />}
//           />
//         </Routes>
//       </div>
//     </BrowserRouter>

// );

export default App;
