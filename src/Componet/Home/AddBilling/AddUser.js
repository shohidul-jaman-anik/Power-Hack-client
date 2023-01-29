import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';



const AddUser = () => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();


  const onSubmit = async data => {
    console.log('form data', data)

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Add User Successfuly',
      showConfirmButton: false,
      timer: 1500
    },

      fetch('https://solutya-server1.herokuapp.com/addUser', {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(result => {
          console.log(result)
          reset()
          if (result) {

          }
        }))
  }
  return (
    <div>
      <h1 className='text-center text-3xl mt-10'>Update User</h1>
      <div className="flex justify-center items-center mt-10">
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className=" form-control border-0 ">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              // defaultValue={}
              placeholder="Enter your Full-Name"
              className="input input-bordered input-primary w-full max-w-xs "
              // {...register("firstName", { required: true })}
              {...register("name", {
                required: {
                  value: true,
                  message: "Full-Name is required"
                },

              })}
            />
            <label className="label">
              {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
            </label>
          </div>

          <div className=" form-control border-0 ">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter E-mail"
              className="input input-bordered input-primary w-full max-w-xs "
              // {...register("firstName", { required: true })}
              {...register("email")}
            />
          </div>

          <div className=" form-control mt-4 border-0">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              type="number"
              placeholder="Enter Phone"
              className="input input-bordered input-primary w-full max-w-xs"
              {...register("phone")}
            />
            <label className="label">
              {errors.phone?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
            </label>
          </div>

          <div className=" form-control mt-4 border-0">
            <label className="label">
              <span className="label-text">Payable Amount</span>
            </label>
            <input
              type="number"
              placeholder="Enter Payable Amount"
              className="input input-bordered input-primary w-full max-w-xs"
              {...register("amount")}
            />
            <label className="label">
              {errors.amount?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.amount.message}</span>}
            </label>
          </div>

          <input type="submit" className='bg-gray-700 mt-3 text-white input input-bordered input-primary w-full max-w-xs' value="Add User" />
        </form>
      </div>
    </div>
  );
};

export default AddUser;