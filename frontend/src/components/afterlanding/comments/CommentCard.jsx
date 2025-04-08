




import React, { useContext } from "react";
import CommentContext from "../../../context/CommentContext";

const Card = ({ name, comment }) => {
  return (
    <div className="flex-shrink-0 w-72 sm:w-80 md:w-96 rounded-lg border border-gray-300 bg-white/10 backdrop-blur-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-[1.05] p-4  ">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-3 text-white shadow-md">
        <h3 className="text-lg sm:text-xl font-bold tracking-wide">👤 {name}</h3>
        <h5 className="text-sm sm:text-lg mt-3 italic font-medium">💬 "{comment}"</h5>
      </div>
    </div>
  );
};

function CommentCard() {
  const { comments } = useContext(CommentContext);

  return (
    <div className="w-full bg-gradient-to-r from-gray-900 to-gray-700 py-4 px-4 rounded-lg shadow-lg">
      <h1 className="text-lg sm:text-xl text-center font-extrabold text-white drop-shadow-md mb-4">User Comments 💬</h1>
      
      <div className="flex gap-5 overflow-x-auto px-5 sm:px-5 py-3 hide-scrollbar ">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <Card key={index} name={comment.name} comment={comment.comment} />
          ))
        ) : (
          <p className="text-gray-300 text-sm sm:text-lg font-medium w-full text-center">No comments added yet...</p>
        )}
      </div>
    </div>
  );
}

export default CommentCard;


