import React, { useState } from 'react';
import Img from './images/todo.png';

const Todo = () => {

    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState([]);

    const addItem = () => {
        if (inputData) {
            setItems([...items, inputData]);
            setInputData("");
        }
    }

    const deleteItem = (id) => {
        const updateitem = items.filter((e, i) => {
            return (i !== id);
        });

        setItems(updateitem);
    }

    return (
        <>
            <div className="main_div">
                <div className="child_div">
                    <figure>
                        <img src={Img} alt="todologo" />
                        <caption>Add Your List Here 👌</caption>
                    </figure>
                    <div className="input_item">
                        <input type="text" placeholder="✍️ Add Item..." value={inputData} onChange={(e) => { setInputData(e.target.value) }} />
                        <span><i className="fas fa-plus" onClick={addItem}></i></span>
                    </div>
                    <div className="show_items">
                        {
                            items.map((element, index) => {
                                return (
                                    <div className="each_item" key={index}>
                                        {element} <i className="fas fa-trash-alt" onClick={() => deleteItem(index)}></i>
                                    </div>
                                );
                            })
                        }
                    </div>

                    <div className="show_items">
                        <button className="btn btn-md btn-primary" onClick={() => setItems([])}><span>REMOVE ALL</span></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Todo;