import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

export default function HazardCardDetails() {
  const history = useHistory()
  const params = useParams();
  const dispatch = useDispatch();
  const id = params.id;
  const [flaggedHazard, setFlaggedHazard] = useState({});

  useEffect(() => {
    dispatch({
      type: "FETCH_HAZARD_CARD_DETAIL",
      payload: id,
    });
  }, []);

  const handleChange = (event) => {
    console.log({...flaggedHazard, 
      [event.target.name]: event.target.value});

    setFlaggedHazard({
      ...flaggedHazard, 
      [event.target.name]: event.target.value
    })
  };

  const handleReport = (id) => {
    // history.push(`/edithazard/${id}`);
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
                  <button 
                    type="button" class="btn btn-primary" 
                    data-bs-toggle="modal" 
                    data-bs-target="#exampleModal"
                  >
                    Report Hazard
                  </button>

                  {/* Modal */}
                  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Choose Reason For Inaccuracy</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <div className="form-group">
                            <label for="reportReason">Reason:</label>
                            <select className="form-control" name="reportReason" id="reportReason" value={flaggedHazard.reportReason} onChange={handleChange}>
                                <option value="">Select A Reason</option>
                                <option value="Hazard No Longer Exists">Hazard No Longer Exists</option>
                                <option value="Information Is Inaccurate">Information Is Inaccurate</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                          <button type="button" class="btn btn-primary">Submit</button>
                        </div>
                      </div>
                    </div>
                  </div> {/* End Modal */}
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
