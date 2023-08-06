"use client";

import Modal from "./Modal";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Post({ post }) {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [postToEdit, setPostToEdit] = useState(post);

  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`/api/posts/${post.id}`, postToEdit)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPostToEdit({});
        setOpenModalEdit(false);
        router.refresh();
      });
  };

  const handleDeleteSubmit = () => {
    axios
      .delete(`/api/posts/${post.id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPostToEdit({});
        setOpenModalEdit(false);
        router.refresh();
      });
  };

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setPostToEdit((prevState) => ({ ...prevState, [name]: value }));
  }

  return (
    <li className="p-3 my-5 bg-slate-200" key={post.id}>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p>{post.description}</p>
      <div className="pt-5">
        <button
          className="text-blue-700 mr-3"
          onClick={() => {
            setOpenModalEdit(true);
          }}
        >
          Edit
        </button>

        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form className="w-full" onSubmit={handleEditSubmit}>
            <h1 className="text-2xl pb-3">Add New Post</h1>
            <input
              type="text"
              placeholder="Title"
              name="title"
              className="w-full p-2 border"
              value={postToEdit.title || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              className="w-full p-2 border"
              value={postToEdit.description || ""}
              onChange={handleChange}
            />
            <button type="submit" className="bg-blue-700 text-white px-5 py-2">
              Submit
            </button>
          </form>
        </Modal>

        <button
          className="text-red-700 mr-3"
          onClick={() => {
            setOpenModalDelete(true);
          }}
        >
          Delete
        </button>
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h1>Are you sure you want to delete this post?</h1>
          <div>
            <button
              onClick={() => {
                handleDeleteSubmit();
              }}
              className="text-blue-700 font-bold mr-5"
            >
              YES
            </button>
            <button
              onClick={() => {
                setOpenModalDelete(false);
              }}
              className="text-red-700 font-bold mr-5"
            >
              No
            </button>
          </div>
          <button type="submit" className="bg-blue-700 text-white px-5 py-2">
            Submit
          </button>
        </Modal>
      </div>
    </li>
  );
}
