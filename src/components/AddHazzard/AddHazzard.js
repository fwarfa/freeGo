import { useState } from "react";
import { useDispatch } from "react-redux";


function AddHazzard() {
    const dispatch = useDispatch()
    const [hazzard, setHazzard] = useState({
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
            type: 'ADD_HAZZARD',
            payload: hazzard
        })
    }

    return (
        <div>
            <h1>Add A Hazzard</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="name"
                    name='name'
                    value={hazzard.name}
                    onChange={(event) => setHazzard({...hazzard, name:event.target.value})}
                />
                <textarea 
                    placeholder="description"
                    name='description'
                    rows="4"
                    value={hazzard.description}
                    onChange={(event) => setHazzard({...hazzard, description:event.target.value})}
                >
                </textarea>
                <input 
                    placeholder="street"
                    name='street'
                    value={hazzard.street}
                    onChange={(event) => setHazzard({...hazzard, street:event.target.value})}
                />
                <input 
                    placeholder="city"
                    name='city'
                    value={hazzard.city}
                    onChange={(event) => setHazzard({...hazzard, city:event.target.value})}
                />
                <input 
                    placeholder="state"
                    name='state'
                    value={hazzard.state}
                    onChange={(event) => setHazzard({...hazzard, state:event.target.value})}
                />
                <input 
                    placeholder="zip"
                    name='zip'
                    value={hazzard.zip}
                    onChange={(event) => setHazzard({...hazzard, zip:event.target.value})}
                />
                <input 
                    placeholder="image"
                    name='image'
                    value={hazzard.image}
                    onChange={(event) => setHazzard({...hazzard, image:event.target.value})}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddHazzard

