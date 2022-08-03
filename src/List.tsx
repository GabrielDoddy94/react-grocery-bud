import { FaEdit, FaTrash } from "react-icons/fa";

import { ListData } from "./App";

type ListProps = {
  items: ListData[];
  removeItem: (id: string) => void;
  editItem: (id: string) => void;
};

export function List({ items, removeItem, editItem }: ListProps) {
  return (
    <div className="grocery-list">
      {items.map(item => {
        const { id, title } = item;

        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>

            <div className="btn-container">
              <button className="edit-btn" onClick={() => editItem(id)}>
                <FaEdit />
              </button>
              <button className="delete-btn" onClick={() => removeItem(id)}>
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
