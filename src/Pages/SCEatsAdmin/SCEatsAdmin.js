import React from 'react';
import { useState, useEffect } from 'react';
import { getAllFoods, createFood, deleteFood, editFood } from '../../APIFunctions/Foods';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import FoodGrid from './FoodGrid';
import FoodForm from './FoodForm';

export default function SCEatsAdmin(props) {
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState();
  const [photo, setPhoto] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [expiration, setExpiration] = useState();

  const [editingId, setEditingId] = useState(null);
  const [editedFood, setEditedFood] = useState({
    name: '',
    photo: '',
    price: '',
    quantity: '',
    expiration: ''
  });

  async function getFoodsFromDB() {
    const foodsFromDB = await getAllFoods();
    if (!foodsFromDB.error) {
      setFoods(foodsFromDB.responseData);
    }
  }

  const handleCreate = async () => {
    await createFood({
      name,
      photo,
      price,
      quantity,
      expiration
    }, props.user.token);
    getFoodsFromDB();
  };

  const handleDelete = async (id) => {
    await deleteFood(id, props.user.token);
    getFoodsFromDB();
  };

  const handleEdit = (food) => {
    setEditingId(food._id);
    setEditedFood({
      name: food.name,
      photo: food.photo,
      price: food.price,
      quantity: food.quantity,
      expiration: food.expiration
    });
  };

  const handleSave = async () => {
    await editFood({ ...editedFood, _id: editingId }, props.user.token);
    getFoodsFromDB();
    setEditingId(null);
  };

  useEffect(() => {
    getFoodsFromDB();
  }, []);

  const INPUT_CLASS = 'indent-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-white';

  return (
    <div className='m-10'>
      <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        SCEats Admin Page
      </h1>

      {/*
          Field Inputs for Food name, photo URL, quantity, price, expiration
      */}

      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-circle btn-primary fixed bottom-4 right-4 shadow-lg w-16 h-16"
        onClick={() => document.getElementById('my_modal_3').showModal()}
      >
        <span className="text-3xl">+</span>
      </button>
      <dialog id="my_modal_3" className="modal">
        <form method="dialog" className="modal-box">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn label-text btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <h3 className="font-bold text-lg">Create New Food</h3>
          <FoodForm
            setName={setName}
            setPhoto={setPhoto}
            setPrice={setPrice}
            setQuantity={setQuantity}
            expiration={expiration}
            setExpiration={setExpiration}
          />
          <button
            type="submit"
            className="rounded-md bg-indigo-600 mt-3 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => handleCreate()}
          >
            Save
          </button>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>


      {/*
          Grid of Food
      */}

      <div>
        <FoodGrid
          foods={foods}
          editingId={editingId}
          editedFood={editedFood}
          setEditedFood={setEditedFood}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
}
