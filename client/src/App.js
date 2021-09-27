import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import "./app.css";

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 38,
    longitude: 127,
    zoom: 3,
  });

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/aminiyolo/cku2avb3l4neb17pcc5mdsfnn"
      >
        <Marker
          latitude={37.55117}
          longitude={126.988228}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <Room
            style={{ fontSize: viewport.zoom * 7, color: "palevioletred" }}
          />
        </Marker>
        {/* <Popup
          latitude={37.55117}
          longitude={126.988228}
          closeButton={true}
          closeOnClick={false}
          anchor="bottom"
        >
          <div className="card">
            <label>Place</label>
            <h4 className="place">Namsan Tower</h4>
            <label>Review</label>
            <p className="review">It is a famous place</p>
            <label>Rating</label>
            <div className="rating">
              <Star className="star" />
              <Star className="star" />
              <Star className="star" />
              <Star className="star" />
            </div>
            <label>Info</label>
            <span className="username">
              Created by <b>Jay</b>
            </span>
            <span className="date">30 mins ago</span>
          </div>
        </Popup> */}
      </ReactMapGL>
    </div>
  );
}

export default App;
