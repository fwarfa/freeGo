import React, {useState} from 'react'
import '../FilterDrawer/FilterDrawer.css'
import { useDispatch } from 'react-redux';


export default function FilterDrawer() {
 const dispatch = useDispatch()
 const [month, setMonth] = useState('');
 const [date, setDate] = useState('');
 const [end, setEnd] =  useState('')
 const [hazardGenre, setHazardGenre] = useState('')
 const [location, setLocation] = useState('')

 const onApplyBtn = () => {
   const filterData  = {
     month, 
     start,
     end,
     hazardGenre, 
     location
   }

 }


 const [alert, setAlert] = useState("");
 const [displayModal, setDisplayModal] = useState(false);
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
        <label htmlFor="start">
          <h4>Month</h4>
          <input
            type="month"
            name="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </label>
        <label htmlFor="start">
          <h4>Start</h4>
          <input
            type="date"
            name={date}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label htmlFor="start">
          <h4>End</h4>
          <input type="date" 
          name={end}
          
          />
        </label>
        <label className="Show">
          <h4>Hazard Genre</h4>
          <input type="text" placeholder="Enter hazard genre" />
        </label>
        <label>
          <h4>Location</h4>
          <input type="text" placeholder="Enter Location" />
        </label>
        <button
          type="button"
          class="btn btn-light"
          onClick={() => onApplyBtn()}
        >
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
      <div
        className={`Overlay ${displayModal ? "Show" : ""}`}
        onClick={() => setDisplayModal(!displayModal)}
      />
      <p className="Alert">{alert}</p>
    </>
  );
}
