import React, { useState, useEffect } from "react";

export default function VoteCount() {
  const [voteCount, setVoteCount] = useState(''); // Initialize voteCount as an empty array

  useEffect(() => {
    votes();
  }, []);

  const votes = async () => {
    try {
      const response = await fetch("http://localhost:5000/candidate/vote/count", {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const result = await response.json();
      setVoteCount(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="products-list">
      <h1>Vote Count</h1>
      <ul>
        <li>Sr. No</li>
        <li>Party</li>
        <li>Votes</li>
      </ul>
      {voteCount.length > 0? (
        voteCount.map((item, index) => (
          <ul key={index}>
            <li>{index + 1}</li>
            <li>{item.party}</li>
            <li>{item.votes}</li>
          </ul>
        ))
      ) : (
        <p>No vote count data available.</p>
      )}
    </div>
  );
}