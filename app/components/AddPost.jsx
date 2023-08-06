"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import axios from "axios";

export default function AddPost() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [inputs, setInputs] = useState({});

  function submitHandler(e) {
    e.preventDefault();
    axios
      .post("/api/posts", inputs)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setInputs({});
        setModalOpen(false);
        router.refresh();
      });
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  }
  return (
    <>
      <button
        className="bg-blue-700 text-white p-3 cursor-pointer"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Add New Post
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form className="w-full" onSubmit={submitHandler}>
          <h1 className="text-2xl pb-3">Add New Post</h1>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="w-full p-2 border"
            value={inputs.title || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            className="w-full p-2 border"
            value={inputs.description || ""}
            onChange={handleChange}
          />
          <button type="submit" className="bg-blue-700 text-white px-5 py-2">
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
}
