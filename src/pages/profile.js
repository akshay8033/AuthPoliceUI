import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Profile({ users }) {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [cookie] = useCookies(["logged_user"]);
  const [disable, setDisable] = useState(false);
  const [msg, setMessage] = useState("");

  useEffect(() => {
    const checkUser = users.filter((user) => user.id * 1 === id * 1);
    setUser(checkUser[0]);
  }, [users, id]);

  const verifyUser = async () => {
    try {
      setDisable(true);
      const data = {
        name: user.name,
        email: user.email,
        verified: true,
      };

      const config = {
        method: "put",
        url: `https://86c2ca7dd42b.ngrok.io/accounts/${user.id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config);
      setMessage("Verification request send. Will verify & get updated soon");
    } catch (err) {
      console.log("Error");
      setDisable(false);
      setMessage("Error while verification. Please try again later");
    }
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card" style={{ width: 500 }}>
        <div className="card-header">User Profile</div>
        <div className="card-body">
          <p className={msg ? "" : "mb-0"}>{msg}</p>
          <div className="d-flex justify-content-between">
            <h4>
              Name - {user.name}{" "}
              {cookie.logged_user * 1 === user.id * 1 ? "(me)" : ""}
            </h4>
            {cookie.logged_user * 1 !== user.id * 1 && !user.verified ? (
              <button
                className="btn btn-success"
                disabled={disable}
                onClick={verifyUser}
              >
                Verify
              </button>
            ) : (
              ""
            )}
          </div>
          <p>Email - {user.email}</p>
          <h5>
            <span
              className={
                user.verified ? "bg-success badge" : "bg-warning badge"
              }
            >
              {user.verified ? "Verified Profile" : "Pending verification"}
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
}
