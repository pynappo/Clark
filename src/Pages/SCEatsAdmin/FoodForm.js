import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function FoodForm( {setName, setPhoto, setPrice, setQuantity, expiration, setExpiration} ) {
  return (
    <>
      <div className="mt-3 flex flex-col gap-3">
        <div className="flex-1 min-w-[200px]">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Food Name</span>
            </div>
            <input type="text" placeholder="For example, Cheetos" className="input input-bordered w-full max-w-xs" onChange={e => setName(e.target.value)} />
          </label>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Photo URL</span>
            </div>
            <input type="text" className="input input-bordered w-full max-w-xs" onChange={e => setPhoto(e.target.value)} />
          </label>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Price</span>
            </div>
            <input type="text" className="input input-bordered w-full max-w-xs" onChange={e => setPrice(e.target.value)} />
          </label>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Quantity</span>
            </div>
            <input type="text" className="input input-bordered w-full max-w-xs" onChange={e => setQuantity(e.target.value)} />
          </label>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Expiration Date</span>
            </div>
            <DatePicker
              name="expiration"
              id="expiration"
              selected={expiration}
              onChange={(date) => setExpiration(date)}
              dateFormat="MM-dd-y"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>
      </div>
    </>
  );
}

