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
    <>
      <h2>Available Food</h2>
    <div className="tableCard">
      {loading ? (
        <p>Loading...</p>
      ) : foodList.length === 0 ? (
        <p>No food available.</p>
      ) : (
        <table className="table">
          <thead>
              <th>Posted On 🕰️</th>
              <th>Food Description</th>
              <th>Quantity</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No. ☎️</th>
              <th>Address 📍</th>
          </thead>
          <tbody>
            {foodList.map((food, index) => {
              const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(food.address)}`;
              const whatsappLink = `https://wa.me/${food.phone.replace(/\D/g, "")}`; // Remove non-numeric chars

              return (
                <tr key={index}>
                  <td>{new Date(food.postedOn).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
                  <td>{food.foodDescription}</td>
                  <td>{food.quantity}</td>
                  <td>{food.name}</td>
                  <td>{food.email}</td>
                  <td>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      {food.phone} 
                    </a>
                  </td>
                  <td>
                    <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
                      {food.address} 
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
};

export default ShowFood;
