import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";

function Review() {
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("Access token not found");
      }

      const response = await fetch("http://127.0.0.1:5000/submit_review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the authorization token in the headers
        },
        body: JSON.stringify({
          rating: rating,
          comment: comment,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
      alert("Review submitted successfully!");

      // Reset comment and rating after successful submission
      setComment("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error.message);
      setErrorMessage("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="card text-center">
      <div className="card-header">Rate Us</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <textarea
              className="form-control"
              id="comment"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <StarRatings
              rating={rating}
              starRatedColor="gold"
              changeRating={(newRating) => setRating(newRating)}
              numberOfStars={5}
              name="rating"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      {errorMessage && (
        <div className="card-footer text-muted">
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        </div>
      )}
    </div>
  );
}

export default Review;
