import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, deleteToy, updateLikes }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard key={toy.id} toy={toy} updateLikes={updateLikes} />
      ))}    
    </div>
  );
}

export default ToyContainer;
