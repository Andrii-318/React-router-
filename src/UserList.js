import React, { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleShowAlbums = (userId) => {
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data);
        setSelectedUser(userId);
        setPhotos([]); // Clear photos when selecting a new user
        setSelectedAlbum(null); // Clear selected album when selecting a new user
      });
  };

  const handleShowPhotos = (albumId) => {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
        setSelectedAlbum(albumId);
      });
  };

  return (
    <div className="App">
      <h1>Список користувачів</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleShowAlbums(user.id)}>Album</button>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div>
          <h2>
            Альбоми користувача{" "}
            {users.find((user) => user.id === selectedUser).name}
          </h2>
          <ul>
            {albums.map((album) => (
              <li key={album.id}>
                {album.title}
                <button onClick={() => handleShowPhotos(album.id)}>
                  Photos
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedAlbum && (
        <div>
          <h2>
            Фото з альбому{" "}
            {albums.find((album) => album.id === selectedAlbum).title}
          </h2>
          <ul>
            {photos.map((photo) => (
              <li key={photo.id}>
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                />
                {photo.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserList;
