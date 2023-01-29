import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllUser = () => {

  // const [product, setProduct] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchResult, setSearchResult] = useState([]);

  // console.log(user, "bal")
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:5000/billing-list')
      .then(res => res.json())
      .then(data => {
        // console.log(data, 'data')
        const match = data.filter(p => p.name.includes(searchText));
        setSearchResult(match);
        // setProduct(data)
      })
  }, [searchText])

  const handleDelete = (id) => {
    console.log(id)
    // const proceed = window.confirm('Are you sure ?')
    Swal.fire({
      title: 'Are you sure?',
      text: "You went to delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        {
          const url = `http://localhost:5000/delete-billing/${id}`
          fetch(url, {
            method: "DELETE"
          })
            .then(res => res.json())
            .then(result => {
              console.log(result, "bangla")
              const remaining = searchResult.filter(d => d._id !== id)
              setSearchResult(remaining)
            })
        }
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

    // if (proceed) 
  }


  const handleUpdate = (id) => {
    navigate(`/updateUser/${id}`)
  }
  const addProduct = (id) => {
    navigate(`/add-billing`)
  }

  const handleSearch = event => {
    setSearchText(event.target.value);
  }
  // const handleSearch = event => {
  //   const searchText = event.target.value;
  //   const match = product.filter(p => p.name.includes(searchText));
  //   setSearchResult(match);
  // }

  return (
    <div>
      <div class="mt-8 ">
        <div>
          <input onChange={handleSearch} type="text" placeholder='Search' />
        </div>
        <div>
          <button className="btn btn-outline" onClick={() => addProduct()}>Add User</button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th className='text-center'>Billing id</th>
              <th className='text-center'>Full-Name</th>
              <th className='text-center'>Email</th>
              <th className='text-center'>Phone</th>
              <th className='text-center'>Paid Amount</th>
              <th className='text-center'>Action</th>
            </tr>
          </thead>

          <tbody>
            {searchResult.map((u, index) =>

              <tr>
                <th className='text-center'>{index + 1}</th>
                <th className='text-center'>{u.name}</th>
                <td className='text-center'>{u.email}</td>
                <td className='text-center'>{u.phone}</td>
                <td className='text-center'>${u.amount}</td>
                <th className='text-center'>
                  <span onClick={() => handleUpdate(u._id)}>✍Update</span>
                  <span class="mx-3">||</span>  {<span onClick={() => handleDelete(u._id)}> Delete❌ </span>}
                </th>
              </tr>)}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AllUser;