import { useState, useEffect } from "react";

export default function AddFood() {
  const [foodDescription, setFoodDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [selectedFoodId, setSelectedFoodId] = useState(null);

  const userName = sessionStorage.getItem("loggedInUser");
  const userEmail = sessionStorage.getItem("loggedInEmail");
  const userPhone = sessionStorage.getItem("loggedInPhone");
  const userAddress = sessionStorage.getItem("loggedInAdd");

  // Function to fetch food list
  const fetchFoodList = async () => {
    try {
      const response = await fetch("https://ngoapi.onrender.com/get-food-by-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await response.json();
      setFoodList(data); // Update state with fetched food list
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  // Function to handle form submission
  const handleSave = async () => {
    if (!foodDescription || !quantity) {
      alert("Please fill all fields!");
      return;
    }

    const payload = {
      name: userName,
      email: userEmail,
      phone: userPhone,
      foodDescription,
      quantity,
      address: userAddress,
    };

    try {
      const response = await fetch("https://ngoapi.onrender.com/add-food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Food added successfully!");
        setFoodDescription("");
        setQuantity("");
        fetchFoodList(); // Refresh the food list
      } else {
        alert("Failed to add food!");
      }
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  // Function to handle row selection
  const handleSelectFood = (foodId) => {
    setSelectedFoodId(foodId === selectedFoodId ? null : foodId); // Toggle selection
  };

  // Function to handle food deletion
  const handleDelete = async () => {
    if (!selectedFoodId) {
      alert("Please select a food item to delete!");
      return;
    }

    try {
      const response = await fetch("https://ngoapi.onrender.com/delete-food-by-id", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: selectedFoodId }),
      });

      if (response.ok) {
        alert("Food deleted successfully!");
        setSelectedFoodId(null);
        fetchFoodList(); // Refresh the food list
      } else {
        alert("Failed to delete food!");
      }
    } catch (error) {
      console.error("Error deleting food:", error);
    }
  };

  // Fetch food list on component mount
  useEffect(() => {
    fetchFoodList();
  }, []);

  return (
    <div>
      <h2>Add Food</h2>
      <div>
        <input
          type="text"
          placeholder="Food Description"
          value={foodDescription}
          onChange={(e) => setFoodDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
      </div>

      <h3>Food List</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Select</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Posted On</th>
          </tr>
        </thead>
        <tbody>
          {foodList.map((food) => (
            <tr key={food._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedFoodId === food._id}
                  onChange={() => handleSelectFood(food._id)}
                />
              </td>
              <td>{food.foodDescription}</td>
              <td>{food.quantity}</td>
              <td>{new Date(food.postedOn).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleDelete} disabled={!selectedFoodId}>
        Delete Selected
      </button>
    </div>
  );
}
