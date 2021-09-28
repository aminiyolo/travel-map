import React, { useEffect, useRef, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import axios from "axios";
import Register from "./components/register";
import Login from "./components/login/login";
import { format } from "timeago.js";
import "./app.css";

function App() {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const titleRef = useRef(null);
  const reviewRef = useRef(null);
  const ratingRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 38,
    longitude: 127,
    zoom: 4,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPins();
  }, []);

  const handleMarkerClick = (id, lng, lat) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: lng });
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      longitude,
      latitude,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title: titleRef.current.value,
      description: reviewRef.current.value,
      rating: ratingRef.current.value,
      longitude: newPlace.longitude,
      latitude: newPlace.latitude,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins((prev) => [...prev, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  const closeRegister = () => {
    setShowRegister(false);
  };

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/aminiyolo/cku2avb3l4neb17pcc5mdsfnn"
        onDblClick={handleAddClick}
        transitionDuration="300"
      >
        {pins.map((pin) => (
          <React.Fragment key={pin._id}>
            <Marker
              latitude={pin.latitude}
              longitude={pin.longitude}
              offsetLeft={-viewport.zoom * 3.5}
              offsetTop={-viewport.zoom * 7}
            >
              <Room
                style={{
                  fontSize: viewport.zoom * 7,
                  color: "palevioletred",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleMarkerClick(pin._id, pin.longitude, pin.latitude)
                }
              />
            </Marker>
            {currentPlaceId === pin._id && (
              <Popup
                latitude={pin.latitude}
                longitude={pin.longitude}
                closeButton={true}
                closeOnClick={false}
                anchor="bottom"
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{pin.title}</h4>
                  <label>Review</label>
                  <p className="review">{pin.description}</p>
                  <label>Rating</label>
                  <div className="rating">
                    {
                      Array(pin.rating).fill(<Star className="star" />)
                      // .map(() => (
                      //   <Star className="star" key={pin._id} />
                      // ))
                    }
                  </div>
                  <label>Info</label>
                  <span className="username">
                    Created by <b>{pin.username}</b>
                  </span>
                  <span className="date">{format(pin.createdAt)}</span>
                </div>
              </Popup>
            )}
          </React.Fragment>
        ))}
        {newPlace && (
          <Popup
            latitude={newPlace.latitude}
            longitude={newPlace.longitude}
            closeButton={true}
            closeOnClick={false}
            anchor="bottom"
            onClose={() => setNewPlace(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input placeholder="title" ref={titleRef} />
                <label>Review</label>
                <textarea placeholder="review" ref={reviewRef} />
                <label>Rating</label>
                <select ref={ratingRef}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="btn" type="submit">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
        {currentUser ? (
          <button className="button logout">Logout</button>
        ) : (
          <div className="buttons__container">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Login
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register closeRegister={closeRegister} />}
        {showLogin && <Login setShowLogin={setShowLogin} />}
      </ReactMapGL>
    </div>
  );
}

export default App;
