import ButtonAdd from "./components/ButtoonAdd";
import ButtonDel from "./components/delButton";
import { useState } from "react";

function App() {
  const [Task, setTask] = useState<string>("");
  const [Stored, setStored] = useState([""]);
  const [Visible, setVisible] = useState(0);

  return (
    <>
      <div className="content">
        <div className="notestored">
          {Stored.map((element, index) => {
            return (
              <div key={index} className="storedtext" id="invisible">
                <div className={"" + index}>
                  <p>{element}</p>
                </div>
              </div>
            );
          })}
        </div>
        <input
          value={Task}
          className="ninput"
          onChange={(e) => setTask(e.target.value)}
        />
        <div className="Buttonsdiv">
          <ButtonAdd
            onClick={() => {
              setStored((prevStored) => [...prevStored, Task]);
            }}
          >
            Add+
          </ButtonAdd>
          <ButtonDel onClick={() => console.log("Del button has been pressed")}>
            Delete
          </ButtonDel>
        </div>
      </div>
    </>
  );
}

export default App;
