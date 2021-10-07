import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
//TODO = create env variable
Geocode.setApiKey("AIzaSyBbtf3Ot3DoK8yxfVML3Hfg2HdcIYwa-MM");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// // A Geocoding request with region=es (Spain) will return the Spanish city.
// Geocode.setRegion("es");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

function AddHazard() {
    const hazardReducer = useSelector(store => store.hazaradReducer);
    const dispatch = useDispatch()
    // const [hazard, setHazard] = useState({
    //     name: '',
    //     description: '',
    //     street: '',
    //     city: '',
    //     state: '',
    //     zip: '',
    //     image: '',
    //     latitude: '',
    //     longitude: ''
    // });
    let params = {id: undefined};

    useEffect(() => {
        // Is there an `:id` param in the URL?
        if (params.id === undefined) {
            // Create mode
            // localhost:3000/hazard
            // Reset store.hazardReducer = {}
            dispatch({
                type: 'CLEAR_HAZARD'
            })
        }
        else {
            // Edit mode
            // localhost:3000/jobEntry/:id
            // GET /jobEntries/:id
            // Save results to store.editJobEntry
            dispatch({
                type: 'FETCH_HAZARD_TO_EDIT',
                payload: params.id
            })
        }
    }, [params.id]);

    const handleChange = (event) =>{
        console.log({
            ...hazardReducer, 
            [event.target.name]: event.target.value
        })
        // dispatch({
        //     type: 'UPDATE_EDIT_HAZARD',
        //     payload: {
        //         ...hazardReducer, 
        //         [event.target.name]: event.target.value
        //     }
        // })
      };


    const getUserLocal = (event) => {
        event.preventDefault();
        if(hazard.street && hazard.city && hazard.state && hazard.zip) {
            let address = hazard.street + ' ' + hazard.city + ' ' + hazard.zip;
            Geocode.fromAddress(address).then(
                (response) => {
                  const { lat, lng } = response.results[0].geometry.location;
                  console.log('lat and lng converted from address', lat, lng);

                  let hazardLocal = {...hazardReducer, latitude:lat, longitude: lng};
                  handleSubmit(hazardLocal);
                },
                (error) => {
                  console.error(error);
                }
            );
        }
    }

    const handleSubmit = (hazardLocal) => {
        console.log('hazard before dispatch', hazardLocal);
        dispatch({
            type: 'ADD_EDIT_HAZARD',
            payload: hazardLocal
        })
    }

    return (
        <div>
            <h1>Add A hazard</h1>
            <form onSubmit={getUserLocal}>
                <input 
                    placeholder="name"
                    name='name'
                    value={hazardReducer.name}
                    onChange={handleChange}
                />
                <textarea 
                    placeholder="description"
                    name='description'
                    rows="4"
                    value={hazardReducer.description}
                    onChange={handleChange}
                >
                </textarea>
                <input 
                    placeholder="street"
                    name='street'
                    value={hazardReducer.street}
                    onChange={handleChange}
                />
                <input 
                    placeholder="city"
                    name='city'
                    value={hazardReducer.city}
                    onChange={handleChange}
                />
                <input 
                    placeholder="state"
                    name='state'
                    value={hazardReducer.state}
                    onChange={handleChange}
                />
                <input 
                    placeholder="zip"
                    name='zip'
                    value={hazardReducer.zip}
                    onChange={handleChange}
                />
                <input 
                    placeholder="image"
                    name='image'
                    value={hazardReducer.image}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddHazard

