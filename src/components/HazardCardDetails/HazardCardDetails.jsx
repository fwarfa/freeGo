import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

export default function HazardCardDetails() {
  const history = useHistory()
  const params = useParams();
  const dispatch = useDispatch();
  const id = params.id;
  useEffect(() => {
    dispatch({
      type: "FETCH_HAZARD_CARD_DETAIL",
      payload: id,
    });
  }, []);

  const editItem = (id) => {
    console.log("edit item id is", id);
    history.push(`/edithazard/${id}`);
  };

  const deleteItem = (id) => {
    console.log("delete item id is", id);
    dispatch({
      type: "DELETE_HAZARD_ITEM",
      payload: id,
    });
    history.push('/home')
  };
    const detail = useSelector((store) => store.cardDetails);


  return (
    <>
      {detail.length > 0 ? (
        detail.map((items, i) => (
          <div key={i}>
            <div>
              <img src={items.image} alt="image" />
            </div>
            <div>
              <h4>
                <span>Moderate</span>
              </h4>
              <h4>
                {items.approved === false ? (
                  <span>Status: Not Approved</span>
                ) : (
                  <span>Status: Approved</span>
                )}
              </h4>
              <div>
                <h2>{items.name}</h2>
                <p>{items.description}</p>
              </div>
              <h4>{items.title}</h4>
              <p>
                {" "}
                <i className="fa fa-map-marker"></i> {items.street},{" "}
                {items.city} {items.state}
              </p>
              <h4>Hazard Genre</h4>
              <div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div>
                  <button onClick={() => editItem (items.id)} >Edit</button>
                  <button onClick={() => deleteItem(items.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
