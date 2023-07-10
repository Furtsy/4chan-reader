import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ModalImage from "react-modal-image";
import htmr from 'htmr';
import DOMPurify from 'dompurify';

export function Board() {
  const [threads, setThreads] = useState([]);
  const { board } = useParams();

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://a.4cdn.org/${board}/catalog.json`,
          {
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
            },
          }
        );

        const threadData = response.data;
        const fetchedThreads = [];

        threadData.forEach(page => {
          page.threads.forEach(thread => {
            const threadInfo = {
              imageUrl: `https://i.4cdn.org/${board}/${thread.tim}${thread.ext}`,
              title: thread.sub || 'No Title',
              description: thread.com || 'No Description',
              threadId: thread.no,
            };

            fetchedThreads.push(threadInfo);
          });
        });

        setThreads(fetchedThreads);
      } catch (error) {
        console.error('pool closed asd famanas threasd!:', error);
      }
    };

    fetchThreads();
  }, [board]);

  return (
    <div className="bg-dark">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-white">4chan Reader</h1>
        <div className="grid grid-cols-3 gap-4">
          {threads.map((thread, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg hover:bg-gray-700 transition duration-300"
            >
              <Link to={`/${board}/thread/${thread.threadId}`} className="text-blue-500 font-bold">
                <div className="mb-2">
                  <ModalImage
                    small={thread.imageUrl}
                    large={thread.imageUrl}
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">{htmr(DOMPurify.sanitize(thread.title))}</h3>
                  <p>{htmr(DOMPurify.sanitize(thread.description))}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
