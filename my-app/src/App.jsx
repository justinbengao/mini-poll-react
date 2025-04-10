import { useState } from 'react';

// PollOption component to display each pet option
const PollOption = ({ label, count, onVote }) => {
  return (
    <div className="flex items-center justify-between p-4 mb-3 border rounded-lg bg-white shadow-sm">
      <div className="text-lg font-medium">{label}</div>
      <div className="flex items-center gap-4">
        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full font-medium">
          {count} votes
        </span>
        <button 
          onClick={onVote} 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Vote
        </button>
      </div>
    </div>
  );
};

// Main App component
export default function App() {
  // State to track votes for each pet
  const [pets, setPets] = useState([
    { option: "Dog", count: 0 },
    { option: "Cat", count: 0 },
    { option: "Rat", count: 0 }
  ]);
  
  // Handle vote for a pet
  const handleVote = (index) => {
    setPets(prevPets => {
      const newPets = [...prevPets];
      newPets[index] = {
        ...newPets[index],
        count: newPets[index].count + 1
      };
      return newPets;
    });
  };
  
  // Get the current leader
  const getLeader = () => {
    if (pets.every(pet => pet.count === 0)) {
      return { option: "No votes yet", count: 0 };
    }
    
    return pets.reduce((leader, pet) => 
      pet.count > leader.count ? pet : leader, 
      { option: "", count: -1 }
    );
  };
  
  const leader = getLeader();
  const totalVotes = pets.reduce((sum, pet) => sum + pet.count, 0);
  
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-50 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Pet Popularity Poll</h1>
      
      <div className="mb-8">
        {pets.map((pet, index) => (
          <PollOption
            key={pet.option}
            label={pet.option}
            count={pet.count}
            onVote={() => handleVote(index)}
          />
        ))}
      </div>
      
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-lg font-medium mb-2">Current Results</h2>
        <p className="mb-1">Total votes: <span className="font-medium">{totalVotes}</span></p>
        <p className="text-lg">
          <span className="font-bold">{leader.option}</span>
          {leader.option !== "No votes yet" ? 
            <span> is winning with <span className="font-bold">{leader.count}</span> votes!</span> 
            : ""}
        </p>
      </div>
    </div>
  );
}