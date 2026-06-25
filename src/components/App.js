import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function addToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToy)
    })
      .then((res) => res.json())
      .then((createdToy) => {
        setToys((prevToys) => [...prevToys, createdToy]);
      });
  }

  function deleteToy(id) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "DELETE",
  }).then(() => {
    setToys((prevToys) =>
      prevToys.filter((toy) => toy.id !== id)
    );
  });
  }

  function updateLikes(id, currentLikes) {
  const updatedLikes = currentLikes + 1;

  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: updatedLikes,
    }),
  })
    .then((res) => res.json())
    .then((updatedToy) => {
      setToys((prevToys) =>
        prevToys.map((toy) =>
          toy.id === updatedToy.id
            ? updatedToy
            : toy
        )
      );
    });
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer 
        toys={toys}
        deleteToy={deleteToy}
        updateLikes={updateLikes}
      />
    </>
  );
}

export default App;
