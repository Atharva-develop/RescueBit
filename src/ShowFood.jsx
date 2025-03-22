import React, { useEffect, useState } from "react";

const ShowFood = () => {
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ngoapi.onrender.com/get-food")
      .then((response) => response.json())
      .then((data) => {
        setFoodList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching food data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card">
      <h2>Available Food</h2>
      {loading ? (
        <p>Loading...</p>
      ) : foodList.length === 0 ? (
        <p>No food available.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Posted On</th>
              <th>Food Description</th>
              <th>Quantity</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No.</th>
            </tr>
          </thead>
          <tbody>
            {foodList.map((food, index) => (
              <tr key={index}>
                <td>{new Date(food.postedOn).toLocaleString()}</td>
                <td>{food.foodDescription}</td>
                <td>{food.quantity}</td>
                <td>{food.name}</td>
                <td>{food.email}</td>
                <td>{food.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowFood;
