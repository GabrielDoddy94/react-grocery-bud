import { useState, useEffect, FormEvent } from "react";

import { List } from "./List";
import { Alert } from "./Alert";

export type ListData = {
  id: string;
  title: string;
};

export type AlertData = {
  show: boolean;
  type: "" | "success" | "danger";
  msg: string;
};

function getLocalStorage() {
  const list = localStorage.getItem("list");

  if (list) {
    return JSON.parse(localStorage.getItem("list") as string) as ListData[];
  } else {
    return [] as ListData[];
  }
}

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState<null | string>(null);
  const [alert, setAlert] = useState<AlertData>({
    show: false,
    type: "",
    msg: "",
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      // display alert
      showAlert(true, "danger", "please enter a value");
    } else if (name && isEditing) {
      setList(
        list.map(item => {
          if (item.id === editID) return { ...item, title: name };

          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "item added to the list");

      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);

      setName("");
    }
  }

  function showAlert(
    show = false,
    type: "" | "success" | "danger" = "",
    msg = ""
  ) {
    setAlert({ show, type, msg });
  }

  function clearList() {
    showAlert(true, "danger", "empty value");
    setList([]);
  }

  function removeItem(id: string) {
    showAlert(true, "danger", "item removed");
    setList(list.filter(item => item.id !== id));
  }

  function editItem(id: string) {
    const specificItem = list.find(item => item.id === id);

    setIsEditing(true);
    setEditID(id);
    setName(specificItem?.title as string);
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />

          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
