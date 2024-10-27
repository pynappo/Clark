import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function FoodForm({ setName, setType, setPhoto, setPrice, setQuantity, expiration, setExpiration }) {
  return (
    <>
      <div className="mt-3 flex flex-col gap-3">
        <div className="flex-1 min-w-[200px]">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Food Name</span>
            </div>
            <input type="text" maxLength={50} placeholder="For example, Cheetos" className="input input-bordered w-full max-w-md" onChange={e => setName(e.target.value)} />
          </label>
        </div>

        <div className="flex-1 min-w-[200px]">
          <div className="label">
            <span className="label-text">Type</span>
          </div>
          <select onChange= {e => setType(e.target.value)} className="select select-bordered w-full max-w-md">
            <option selected>All</option>
            <option>Drink</option>
            <option>Snack</option>
            <option>Dessert</option>
            <option>Candy</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Photo URL</span>
            </div>
            <input type="text" className="input input-bordered w-full max-w-md" onChange={e => setPhoto(e.target.value)} />
          </label>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Price</span>
            </div>
            <input type="text" maxLength={5} className="input input-bordered w-full max-w-md" onChange={e => setPrice(e.target.value)} />
          </label>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Quantity</span>
            </div>
            <input type="text" maxLength={5} className="input input-bordered w-full max-w-md" onChange={e => setQuantity(e.target.value)} />
          </label>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Expiration Date</span>
            </div>
            <DatePicker
              name="expiration"
              id="expiration"
              selected={expiration}
              onChange={(date) => setExpiration(date)}
              dateFormat="MM-dd-y"
              className="input input-bordered w-full max-w-md"
            />
          </label>
        </div>
      </div>
    </>
  );
}

