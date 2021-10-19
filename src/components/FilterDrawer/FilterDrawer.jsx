import React, {useState} from 'react'
import '../FilterDrawer/FilterDrawer.css'
import { useDispatch } from 'react-redux';
import {  DateRangePicker } from 'react-date-range';
import {  addDays } from 'date-fns';
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-date-range/dist/styles.css'; // main style file
import Geocode from "react-geocode";


export default function FilterDrawer() {
  const dispatch = useDispatch()
  const [created_date, setCreated_Date] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

 const [displayModal, setDisplayModal] = useState(false);
 const [genreTitle, setGenreTitle] = useState("");
 const [address, setAddress] = useState('');
 const [threat_Level, setThreat_Level] = useState('');
 const [distance, set_distance] = useState('5');

 Geocode.setApiKey("AIzaSyBbtf3Ot3DoK8yxfVML3Hfg2HdcIYwa-MM");
 Geocode.setLanguage("en");

 const applyBtn= () => {
  if (address) {
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        // setLocation({
        //   latitude:lat,
        //   longitude: lng,
        // });

        
        dispatch({
          type: "FETCH_HAZARD",
          payload: {
            date: created_date,
            genreTitle: genreTitle,
            userLatLng: {latitude: lat, longitude: lng},
            threat_Level: threat_Level,
          },
        });
      },
        (err) => {
          console.log(err);
        }
    );
  }
  setDisplayModal(!displayModal);
  setAddress(''); 
 }

  return (
    <>
      <div
        className="Button CenterAlign"
        onClick={() => setDisplayModal(!displayModal)}
      >
        <i className="fa fa-filter" aria-hidden="true"></i>
      </div>

      <div className={`Modal ${displayModal ? "Show" : ""}`}>
        <h3>Filter</h3>
        <button
          className="Close"
          onClick={() => setDisplayModal(!displayModal)}
        >
          <i className="fa fa-times-circle-o" aria-hidden="true"></i>
        </button>


        <div className="container">
          <div className="row">
            <div className="col-sm">
              <div htmlFor="start">
                <h4>Duration</h4>
                <DateRangePicker
                  onChange={(item) => setCreated_Date([item.selection])}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  // months={2} <-- Do not need two months
                  ranges={created_date}
                  direction="horizontal"
                  />
              </div>
            </div>
            <div className="col-sm">
              <div>
                <h4>Address / Location</h4>
                <input
                onChange={event => setAddress(event.target.value)}
                  className="form-control"
                  value={address}
                  placeholder="Address / Location"
                  required
                />
              </div>
              <h4>Hazard Threat Level:</h4>
              <select
                className="form-control"
                name="threatLevel"
                id="threatLevel"
                value={threat_Level}
                onChange={(e) => setThreat_Level(e.target.value)}
              >
                <option selected>Select A Threat Level</option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </select>
              <h4>Distance:</h4>
              <select
                className="form-control"
                name="distance"
                id="distance"
                value={distance}
                onChange={(e) => set_distance(e.target.value)}
              >
                <option selected>Select A Distance</option>
                <option value="1">1 Mile</option>
                <option value="5">5 Miles</option>
                <option value="10">10 Miles</option>
              </select>
              <div className="Show">
                <div className="form-group">
                    <label for="hazardGenre">Hazard Genre:</label>
                    <select className="form-control" name="hazardGenre" id="hazardGenre" value={genreTitle} onChange={(e) => setGenreTitle(e.target.value)}>
                        <option selected>Select A Genre</option>
                        <option value="CRIME">CRIME</option>
                        <option value="ROADWORK">ROAD WORK</option>
                        <option value="ACCIDENT">ACCIDENT</option>
                        <option value="OTHER">OTHER</option>
                    </select>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-container-filter">
            <button type="button" class="btn btn-primary" onClick={applyBtn}>
            Apply
            </button>
            <button
              type="button"
              class="btn btn-success"
              onClick={() => setDisplayModal(!displayModal)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div
        className={`Overlay ${displayModal ? "Show" : ""}`}
        onClick={() => setDisplayModal(!displayModal)}
      />
      <p className="Alert">{alert}</p>
    </>
  );
}

