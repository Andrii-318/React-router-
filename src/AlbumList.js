import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const userId = new URLSearchParams(useLocation().search).get("userId");

  useEffect(() => {
    if (userId) {
      fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => setAlbums(data));
    }
  }, [userId]);

  return (
    <div>
      <h1>Альбоми користувача</h1>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            {album.title}
            <br />
            <Link to={`/photos?albumId=${album.id}`}>
              <button>Photos</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumList;
