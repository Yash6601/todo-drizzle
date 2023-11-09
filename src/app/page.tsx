"use client"

import { api } from "~/trpc/react";
import { type FormEvent, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");

  const addMutation =  api.task.add.useMutation();
  const utils = api.useContext();
  const deleteMutation = api.task.deleteMutation.useMutation();

  const tasks = api.task.list.useQuery().data || [];
  const handleDelete = async (taskId:number)=>{
    await deleteMutation.mutateAsync({
      id:taskId,
    });
    await utils.task.list.refetch()
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addMutation.mutateAsync({
      title,
    });

    setTitle("");

    await utils.task.list.refetch()
  }



  return (
    <div className="container m-auto w-96 border-2 p-5">
      <h1 className="text-center text-4xl">Todo-List</h1>

      <div>
        <ul>
          {tasks.map((task) => {
            return <li className={"flex justify-between"} key={task.id}>{task.title}
              <button className={"text-black"} onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          })}
        </ul>
        <form className="flex mt-4" onSubmit={
          handleSubmit
        }>
          <input type="text" placeholder={'New task...'} className={'border'}
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
          />
          <button type={'submit'} className="border px-4">Add</button>
        </form>
      </div>
    </div>
  );
}
