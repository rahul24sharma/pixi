import React, { useState, useEffect } from "react";
import "./Control.css";
import { faMinusSquare, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { point } from "./App";
import Datatable from "./Datatable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Control = () => {
  const [value, setValue] = useState(1.0);
  const [value2, setValue2] = useState(1.0);
  const [show, setShow] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [fliped, setFliped] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [number, setNumber] = useState(1.0);
  const cash = number.toFixed(2);

  const [isClicked, setIsClicked] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const intervalId = setInterval(() => {
        setNumber((prevNumber) => {
          const newNumber = prevNumber + 0.01;
          if (newNumber >= point) {
            clearInterval(intervalId);
            return point;
          }
          return newNumber;
        });
      }, 100);

      return () => clearInterval(intervalId);
    }, 13500);

    return () => clearTimeout(timerId);
  }, []);

  const handleIncrement = () => {
    setValue((prevValue) => parseFloat((prevValue + 0.01).toFixed(2)));
  };

  const handleDecrement = () => {
    if (value > 1.0) {
      setValue((prevValue) => parseFloat((prevValue - 0.01).toFixed(2)));
    }
  };

  const handleIncrement2 = () => {
    setValue2((prevValue) => parseFloat((prevValue + 0.01).toFixed(2)));
  };

  const handleDecrement2 = () => {
    if (value > 1.0) {
      setValue2((prevValue) => parseFloat((prevValue - 0.01).toFixed(2)));
    }
  };
  const handleValueButton = (val) => {
    setValue(val);
  };
  const handleValueButton2 = (val) => {
    setValue2(val);
  };

  const handleClick = () => {
    if (!isClicked) {
      setCount1(count1 + 1);
      setIsClicked(true);
    }
    setFlipped(!flipped);
    if (!flipped) {
      toast("Bet placed successfully");
    } else {
      toast("Cashout succesful");
    }
  };

  const clicked = () => {
    if (!isClicked2) {
      setCount2(count2 + 1);
      setIsClicked2(true);
    }
    setFliped(!fliped);
    if (!fliped) {
      toast("Bet placed successfully");
    } else {
      toast("Cashout succesful");
    }
  };

  const handleToggleChange = () => {
    setToggle(!toggle);
  };

  const [name, nameChange] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, value, value2, point, cash };
    console.log(data);

    fetch("http://localhost:8000/posts")
      .then((response) => response.json())
      .then((json) => {
        const existingData = json.find(
          (item) =>
            item.name === name &&
            item.value === value &&
            item.value2 === value2 &&
            item.point === point
        );
        if (existingData) {
          existingData.cash = cash;
          fetch(`http://localhost:8000/posts/${existingData.id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(existingData),
          }).then(() => {
            console.log("Data updated successfully");
          });
        } else {
          fetch("http://localhost:8000/posts", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
          })
            .then(() => {
              console.log("Data saved successfully");
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
      });
  };
  return (
    <div className="b1">
      <div className="con">
        <div className="box">
          <FontAwesomeIcon
            onClick={() => setShow(!show)}
            style={{
              backgroundColor: "#282621",
              color: "black",
              fontSize: "23px",
              position: "absolute",
              marginLeft: "370px",
              marginTop: "10px",
            }}
            icon={faPlusSquare}
          />
          <div className="toggle-container" onClick={handleToggleChange}>
            <div className={`toggle-btn ${!toggle ? "disable" : ""}`}>
              {toggle ? "Auto" : "Bet"}
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="betxx">
              <button
                className={`flip-button ${flipped ? "flipped" : ""}`}
                onClick={handleClick}
              >
                <div className="flip-front">Bet</div>
                <div className="flip-back">
                  Cashout
                  <br />
                  {cash + "x"}
                </div>
              </button>
            </div>
            <ToastContainer />
            <div className="wrapper">
              <div className="multiplier">{value.toFixed(2)}</div>
              <FontAwesomeIcon
                onClick={handleIncrement}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "23px",
                  outline: "none",
                }}
                icon={faPlusSquare}
              />
              <FontAwesomeIcon
                onClick={handleDecrement}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "23px",
                  outline: "none",
                  margin: "0px 5px",
                }}
                icon={faMinusSquare}
              />
            </div>
          </form>
          <div className="buttons">
            <Button
              variant="secondary"
              onClick={() => handleValueButton(1)}
              id="one"
              className="primary"
              size="sm"
            >
              1$
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleValueButton(2)}
              className="primary"
              size="sm"
            >
              2$
            </Button>
            <div className="third">
              <Button
                variant="secondary"
                onClick={() => handleValueButton(5)}
                className="primary"
                size="sm"
              >
                5$
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleValueButton(10)}
                className="primary"
                size="sm"
              >
                10$
              </Button>
            </div>
          </div>
        </div>
        {show && (
          <div className="box" id="box2">
            <FontAwesomeIcon
              onClick={() => setShow(!show)}
              style={{
                backgroundColor: "#282621",
                color: "black",
                fontSize: "23px",
                position: "absolute",
                marginLeft: "370px",
                marginTop: "10px",
              }}
              icon={faMinusSquare}
            />
            <div className="toggle-container" onClick={handleToggleChange}>
              <div className={`toggle-btn ${!toggle ? "disable" : ""}`}>
                {toggle ? "Auto" : "Bet"}
              </div>
            </div>
            <div className="betxx">
              <button
                style={{ marginTop: "12px" }}
                className={`flip-button ${fliped ? "fliped" : ""}`}
                onClick={clicked}
              >
                <div className="flip-front">Bet</div>
                <div className="flip-back">Cashout</div>
              </button>
            </div>
            <ToastContainer />
            <div className="wrapper">
              <div className="multiplier">{value2.toFixed(2)}</div>
              <FontAwesomeIcon
                onClick={handleIncrement2}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "23px",
                  outline: "none",
                }}
                icon={faPlusSquare}
              />
              <FontAwesomeIcon
                onClick={handleDecrement2}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "23px",
                  margin: "0px 5px",
                  outline: "none",
                }}
                icon={faMinusSquare}
              />
            </div>

            <div className="buttons">
              <Button
                onClick={() => handleValueButton2(1)}
                variant="secondary"
                className="primary"
                size="sm"
              >
                1$
              </Button>
              <Button
                onClick={() => handleValueButton2(2)}
                variant="secondary"
                className="primary"
                size="sm"
              >
                2$
              </Button>
              <div className="third">
                <Button
                  onClick={() => handleValueButton2(5)}
                  variant="secondary"
                  className="primary"
                  size="sm"
                >
                  5$
                </Button>
                <Button
                  onClick={() => handleValueButton2(10)}
                  variant="secondary"
                  className="primary"
                  size="sm"
                >
                  10$
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="formitems">
        <div className="bets">
          <p className="bet">
            Total Bets :{" "}
            <span style={{ color: "#00ced1" }}>{count1 + count2}</span>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="col-md-10">
            <input
              className="form-control"
              type="text"
              name="name"
              value={name}
              onChange={(e) => nameChange(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div className="form-button">
            <button className="play" id="submit" type="submit">
              Play
            </button>
          </div>
        </form>
        <div className="datatable">
          <Datatable />
        </div>
      </div>
    </div>
  );
};

export default Control;
