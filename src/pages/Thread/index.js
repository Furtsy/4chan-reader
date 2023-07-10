import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ModalImage from "react-modal-image";
import htmr from 'htmr';
import DOMPurify from 'dompurify';

export function Thread() {
  const [posts, setPosts] = useState([]);
  const { board, threadId } = useParams();

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://a.4cdn.org/${board}/thread/${threadId}.json`,
          {
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
            },
          }
        );

        const threadData = response.data.posts;
        const fetchedPosts = [];

        threadData.forEach(post => {
          const postInfo = {
            imageUrl: post.ext && `https://i.4cdn.org/${board}/${post.tim}${post.ext}`,
            title: post.sub || post.com || 'No Title',
            description: post.com || 'No Description',
            resto: post.resto
          };

          fetchedPosts.push(postInfo);
        });

        setPosts(fetchedPosts);
      } catch (error) {
        console.error('pool closed asd famanas threasd!:', error);
      }
    };

    fetchThread();
  }, [board, threadId]);

  return (
    <div className="bg-dark">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-white">4chan Reader</h1>
        <div className="grid grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg hover:bg-gray-700 transition duration-300 flex items-center"
            >
              <div className="w-20 h-20 mr-4 relative overflow-hidden rounded-lg">
                {post.imageUrl && (
                  <ModalImage
                    small={post.imageUrl}
                    large={post.imageUrl}
                    className="w-full h-full object-cover transform transition duration-300 hover:scale-105 hover:opacity-90"
                  />
                )}
              </div>
              <div className="text-white">
                <h3 className="text-xl font-bold mb-2">{htmr(DOMPurify.sanitize(post.title))}</h3>
                <p>{htmr(DOMPurify.sanitize(post.description))}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
