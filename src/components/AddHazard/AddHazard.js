import { useState } from "react";
import { useDispatch } from "react-redux";


function AddHazard() {
    const dispatch = useDispatch()
    const [hazard, setHazard] = useState({
        name: '',
        description: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        image: ''
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'ADD_hazard',
            payload: hazard
        })
    }

    return (
        <div>
            <h1>Add A hazard</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="name"
                    name='name'
                    value={hazard.name}
                    onChange={(event) => setHazard({...hazard, name:event.target.value})}
                />
                <textarea 
                    placeholder="description"
                    name='description'
                    rows="4"
                    value={hazard.description}
                    onChange={(event) => setHazard({...hazard, description:event.target.value})}
                >
                </textarea>
                <input 
                    placeholder="street"
                    name='street'
                    value={hazard.street}
                    onChange={(event) => setHazard({...hazard, street:event.target.value})}
                />
                <input 
                    placeholder="city"
                    name='city'
                    value={hazard.city}
                    onChange={(event) => setHazard({...hazard, city:event.target.value})}
                />
                <input 
                    placeholder="state"
                    name='state'
                    value={hazard.state}
                    onChange={(event) => setHazard({...hazard, state:event.target.value})}
                />
                <input 
                    placeholder="zip"
                    name='zip'
                    value={hazard.zip}
                    onChange={(event) => setHazard({...hazard, zip:event.target.value})}
                />
                <input 
                    placeholder="image"
                    name='image'
                    value={hazard.image}
                    onChange={(event) => setHazard({...hazard, image:event.target.value})}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddHazard

