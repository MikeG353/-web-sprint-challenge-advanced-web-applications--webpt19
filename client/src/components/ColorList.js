import React, { useState } from "react";
import  { axiosWithAuth, baseURL } from '../api/axiosWithAuth'
// import { fetchColors } from '../api/fetchColors'
import { useParams } from "react-router-dom";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, fetchColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const {id} = useParams()
  // const id = 1

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`${baseURL}/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        const newColorsList = colors.map(color => {
          if (color.id === res.data.id) {
            return res.data
          }
          return color
        })
        updateColors(newColorsList)
      })
      .catch(err => {
        console.error(`unable to update color data for color ${id}. error: `, err)
      })
  };

  const addColor = (e) => {
    e.preventDefault()
    axiosWithAuth()
    .post(`${baseURL}/colors`, colorToEdit)
    .then(res => {
      const newColorsList = res.data
      updateColors(newColorsList)
    })
    .catch(err => {
      console.error(`unable to add color to colors list. error: `, err)
    })
  }

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`${baseURL}/colors/${color.id}`)
      .then(res => {
        const newColorsList = fetchColors()
        console.log(newColorsList)
      }
      )
      .catch(err => {
        console.error(`unable to delete color ${id}. error: `, err)
      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
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
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
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
      <form onSubmit={addColor}>
              <legend>add a color</legend>
              <label>
                color name:
                <input 
                  onChange={e => 
                    setColorToEdit({
                      ...colorToEdit,
                      color: e.target.value
                    })
                  }
                  value={colorToEdit.color}                
                />
              </label>
              <label>
                hex code:
                <input 
                  onChange={e => 
                    setColorToEdit({
                      ...colorToEdit,
                      code: { hex: e.target.value }
                    })
                  }
                  value={colorToEdit.code.hex}                
                />
              </label>
              <div className='button-row'>
                <button type='submit'>save</button>
              </div>
      </form>
    </div>
  );
};

export default ColorList;
