import React from "react";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";
import { baseURL } from "../utils/constant";

const List = ({ id, user, setUpdateUI, updateMode }) => {
  const removeUser = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res);
      setUpdateUI((prevState) => !prevState);
    });
  };

  return (
    <li>
      {user}
      <div className="icon_holder">
        <BiEditAlt className="icon" onClick={() => updateMode(id, user)} />
        <BsTrash className="icon" onClick={removeUser} />
      </div>
    </li>
  );
};

export default List;
