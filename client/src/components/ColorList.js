import React, { useState, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { BubblesContext } from '../contexts/BubblesContext';

const initialColor = {
  color: '',
  code: { hex: '' },
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);
  const { getColors } = useContext(BubblesContext);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        setEditing(false);
        getColors();
      })
      .catch((err) => console.log(err.response.data));
  };

  const deleteColor = (color) => {
    axiosWithAuth()
      .delete(`/api/colors/${color}`)
      .then((res) => {
        getColors();
      })
      .catch((err) => console.log(err.response.data));
  };

  const addColor = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/api/colors`, colorToAdd)
      .then((res) => {
        getColors();
        setColorToAdd(initialColor);
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      {/* Add Color */}
      <form onSubmit={addColor}>
        <legend>edit color</legend>
        <label>
          color name:
          <input
            onChange={(e) =>
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            }
            value={colorToAdd.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={(e) =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value },
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">save</button>
        </div>
      </form>
      {/* end add color  */}
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color.id);
                }}
              >
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
