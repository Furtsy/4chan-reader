import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ModalImage from "react-modal-image";

export function Home() {
  const [boards, setBoards] = useState([]);
  const [activeThreads, setActiveThreads] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get(
          'https://cors-anywhere.herokuapp.com/https://a.4cdn.org/boards.json',
          {
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
            },
          }
        );
        setBoards(response.data.boards);
      } catch (error) {
        console.error('pool closed asd famanas boards!', error);
      }
    };

    const fetchActiveThreads = async () => {
      try {
        const response = await axios.get('https://cors-anywhere.herokuapp.com/https://api.4stats.io/activeThreads/p');
        setActiveThreads(response.data);
      } catch (error) {
        console.error('pool closed asd famanas threasd!:', error);
      }
    };

    fetchBoards();
    fetchActiveThreads();
  }, []);

  return (
    <div className="bg-dark">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-white">4chan Reader</h1>
        <div className="grid grid-cols-3 gap-4">
          {boards.map((board) => (
            <div
              key={board.board}
              className="bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg hover:bg-gray-700 transition duration-300"
            >
              <Link to={`/${board.board}`} className="text-blue-500 font-bold">
                {board.title}
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-white">Active Threads</h2>
          {activeThreads.map((thread) => (
  <div key={thread.no} className="bg-gray-800 rounded-lg shadow-md p-4 mb-4 flex items-center">
    <div className="w-20 h-20 mr-4 relative overflow-hidden rounded-lg">
      {thread.image ? (

<ModalImage
  small={thread.image}
  large={thread.image}
  className="w-full h-full object-cover transform transition duration-300 hover:scale-105 hover:opacity-90"
/>

      ) : (
        <div className="w-full h-full flex items-center justify-center text-white">
          Resim yükleniyor...
        </div>
      )}
    </div>
    <div>
      <Link to={`/p/thread/${thread.no}`} className="text-blue-500 font-bold">
        <h3 className="text-xl font-bold mb-2 text-blue-500 hover:text-blue-700">
          Thread #{thread.no}
        </h3>
      </Link>
      <p className="text-white">{thread.com}</p>
    </div>
  </div>
))}

        </div>
      </div>
    </div>
  );
}
