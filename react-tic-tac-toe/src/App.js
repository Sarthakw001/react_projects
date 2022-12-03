import React, { useState } from "react";

// Components
import Icon from "./components/Icon";

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//All CSS
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

// Reactstrap
import { Card, CardBody, Container, Button, Col, Row } from "reactstrap";

// itemArray

import confetti from "canvas-confetti";

const itemArray = new Array(9).fill("empty");

// main Component
const App = () => {
  // useState
  const [isCross, setIsCross] = useState(false);
  const [winMsg, setWinMsg] = useState("");

  // reload Game Function
  const reloadGame = () => {
    setIsCross(false);
    setWinMsg("");
    itemArray.fill("empty", 0, 9);
  };

  // Check Winner
  const checkIsWinner = () => {
    if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2]
    ) {
      setWinMsg(`${itemArray[0]} wins`);
      celebrate();
    } else if (
      itemArray[3] !== "empty" &&
      itemArray[3] === itemArray[4] &&
      itemArray[3] === itemArray[5]
    ) {
      setWinMsg(`${itemArray[3]} wins`);
      celebrate();
    } else if (
      itemArray[6] !== "empty" &&
      itemArray[6] === itemArray[7] &&
      itemArray[6] === itemArray[8]
    ) {
      setWinMsg(`${itemArray[6]} wins`);
      celebrate();
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[4] &&
      itemArray[0] === itemArray[8]
    ) {
      setWinMsg(`${itemArray[0]} wins`);
      celebrate();
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[4] &&
      itemArray[2] === itemArray[6]
    ) {
      setWinMsg(`${itemArray[2]} wins`);
      celebrate();
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[3] &&
      itemArray[0] === itemArray[6]
    ) {
      setWinMsg(`${itemArray[0]} wins`);
      celebrate();
    } else if (
      itemArray[1] !== "empty" &&
      itemArray[1] === itemArray[4] &&
      itemArray[1] === itemArray[7]
    ) {
      setWinMsg(`${itemArray[1]} wins`);
      celebrate();
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[5] &&
      itemArray[2] === itemArray[8]
    ) {
      setWinMsg(`${itemArray[2]} wins`);
      celebrate();
    }
  };

  const checkItemArray = () => {
    let flag = false;
    for (let i of itemArray) {
      if (i === "empty") {
        flag = true;
        break;
      }
    }
    if (flag === false) {
      setWinMsg("Keep Calm ! It's TIE Game");
    }
  };
  // Manipulate the "Cross" OR "ZERO"
  const changeItem = (itemNumber) => {
    if (winMsg) {
      return toast(winMsg, { type: "success" });
    }
    if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = isCross ? "Cross" : "Circle";
      setIsCross(!isCross);
    } else {
      return toast("already filled", { type: "error" });
    }

    checkItemArray();
    checkIsWinner();
  };
  // change Style of Item
  function celebrate() {
    var end = Date.now() + (1 * 1000);

    // go Buckeyes!
    var colors = ['#bb0000', '#ffffff'];
    
    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });
    
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }
  //return the Component
  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={6} className="offset-md-3">
          {winMsg ? (
            <div className="mb-2 mt-2">
              <h1 className="text-white text-uppercase text-center cstmh1">
                {winMsg}
              </h1>
              <Button
                className="cstmBtn"
                color="light"
                block
                onClick={reloadGame}
              >
                Reload the Game
              </Button>
            </div>
          ) : (
            <h1 className="text-center text-white">
              {isCross ? "Cross" : "Circle"} turns
            </h1>
          )}
          <div className="grid">
            {itemArray.map((item, index) => {
              return (
                <Card
                  style={{ borderRadius: "5px" }}
                  key={index}
                  onClick={() => {
                    changeItem(index);
                  }}
                >
                  <CardBody className="box">
                    <Icon name={item} />
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
