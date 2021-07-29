import React, { useState, useEffect } from 'react';
import Img from './images/todo.png';

const Todo = () => {

    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState([]);
    const [toggleBtn, setToggleBtn] = useState(true);
    const [editItemData, setEditItemData] = useState(null);

    const addItem = () => {
        if (inputData && !toggleBtn) {

            setItems(items.map((element) => {
                if (element.id === editItemData.id) {
                    console.log(inputData);
                    return { ...element, name: inputData };
                }
                else {
                    return element;
                }
            }));

            setEditItemData(null);
            setInputData({ id: "", name: "" });
            setToggleBtn(true);
        }
        else if (inputData) {
            const allInputData = { id: new Date().getTime().toString(), name: inputData };
            setItems([...items, allInputData]);
            setInputData({ id: "", name: "" });
        }
    }

    const deleteItem = (index) => {
        const updateitem = items.filter((e) => {
            return (e.id !== index);
        });

        setItems(updateitem);
    }

    const editItem = (id) => {
        const updateItem = items.find((current) => {
            return (id === current.id);
        });

        setEditItemData(updateItem);
        setInputData(updateItem);
        setToggleBtn(false);
    }

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items])

    return (
        <>
            <div className="main_div">
                <div className="child_div">
                    <figure>
                        <img src={Img} alt="todologo" />
                        <caption>Add Your List Here 👌</caption>
                    </figure>
                    <div className="input_item">
                        <input type="text" placeholder="✍️ Add Item..." value={inputData.name} onChange={(e) => { setInputData(e.target.value) }} />
                        <span>
                            {
                                toggleBtn ? <i className="fas fa-plus btn-add" onClick={addItem}></i> :
                                    <i className="fas fa-edit btn-add" onClick={addItem}></i>
                            }

                        </span>
                    </div>
                    <div className="show_items">
                        {
                            items.map((element) => {
                                return (
                                    <div className="each_item" key={element.id}>
                                        {element.name} <span className="fa-icon">
                                            <i className="fas fa-edit" onClick={() => editItem(element.id)}></i>
                                            <i className="fas fa-trash-alt" onClick={() => deleteItem(element.id)}></i></span>
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