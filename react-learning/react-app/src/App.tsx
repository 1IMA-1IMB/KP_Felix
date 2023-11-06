import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";
import H1 from "./components/H1";
import { useState } from "react";

function App() {
  const [alertVissible, setAlertVisibillity] = useState(false);
  return (
    <div>
      {alertVissible && (
        <Alert onClose={() => setAlertVisibillity(false)}>Hello</Alert>
      )}
      <Button color="danger" onClick={() => setAlertVisibillity(true)}>
        Hello
      </Button>
      <H1>Hello</H1>
    </div>
  );
  // let items = ["New York", "San Fransisco", "Tokyo", "London", "Paris"];
  // const handleSelectItem = (item: string) => {
  //   console.log(item);
  // };
  //   return (
  //     <div>
  //       {/* <ListGroup
  //         items={items}
  //         heading="Cities"
  //         onSelectItem={handleSelectItem}
  //       /> */}
  //       <alert />
  //     </div>
  //   );
}

export default App;
