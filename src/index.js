import ReactDOM from "react-dom";
import App from "./App";

import Toggle from "./Toggle";
import HigherEnergy from "./HigherEnergy";
import MostHerd from "./MostHerd";
import FastAdopt from "./FastAdopt";
import EconomyAdopt from "./EconomyAdopt";
import AdoptableState from "./AdoptableState";
import SizeAdopted from "./SizeAdopted";
import NumberShelter from "./NumberShelter";
import MostDogs from "./MostDogs";
import MostPopular from "./MostPopular";
import DailyGroom from "./DailyGroom";
ReactDOM.render(
  <div>
      1. <Toggle />, 
      <br></br>
      2. <HigherEnergy />, 
      <br></br>
      3. <MostHerd />, 
      <br></br>
      4. <FastAdopt />, 
      <br></br>
      5. <EconomyAdopt />, 
      <br></br>
      6. <AdoptableState />, 
      <br></br>
      7. <SizeAdopted />, 
      <br></br>
      8. <NumberShelter />, 
      <br></br>
      9. <MostDogs />, 
      <br></br>
      10. <MostPopular />, 
      <br></br>
      11. <DailyGroom />, 
      <br></br>
      <App />, 
  </div>,
  document.getElementById("root")
);
