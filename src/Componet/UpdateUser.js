import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateUser = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const { id } = useParams()

    const onSubmit = async data => {
        // console.log(data)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Update User Successfully',
            showConfirmButton: false,
            timer: 1500
        },
            fetch(`http://localhost:5000/billing/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(result => {
                    // if (result.matchedCount === 1) {
                    console.log("result", result)
                    reset()
                    // toast("Update Successfully done")
                    // }
                    // else {
                    // }
                }))
    }
    return (
        <div>
            <h1 className='text-center text-3xl mt-16'>Update User</h1>
            <div className="flex justify-center items-center mt-10">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className=" form-control border-0 ">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            // defaultValue={}
                            placeholder="Enter Name"
                            className="input input-bordered input-primary w-full max-w-xs "
                            // {...register("firstName", { required: true })}
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Name is required"
                                },

                            })}
                        />
                        <label className="label">
                            {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                        </label>
                    </div>

                    <div className=" form-control  border-0 ">
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

                    <div className=" form-control mt-5 border-0">
                        <label className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Price"
                            className="input input-bordered input-primary w-full max-w-xs"
                            // {...register("firstName", { required: true })}
                            {...register("phone")}
                        />
                        <label className="label">
                            {errors.phone?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                        </label>
                    </div>

                    <div className=" form-control mt-5 border-0">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Price"
                            className="input input-bordered input-primary w-full max-w-xs"
                            // {...register("firstName", { required: true })}
                            {...register("amount")}
                        />
                        <label className="label">
                            {errors.phone?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                        </label>
                    </div>

                    <input type="submit" className='input mt-3 input-bordered input-primary w-full max-w-xs bg-gray-700 text-white' value="Update User" />
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;