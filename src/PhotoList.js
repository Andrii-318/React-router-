import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const albumId = new URLSearchParams(useLocation().search).get("albumId");

  useEffect(() => {
    if (albumId) {
      fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
        .then((response) => response.json())
        .then((data) => setPhotos(data));
    }
  }, [albumId]);

  return (
    <div>
      <h1>Фотографії альбому</h1>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
            />
            <p>{photo.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhotoList;
