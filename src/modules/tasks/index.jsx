import React from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import { useTasksResumeMutation } from 'redux/index';
import { useGetTasksQuery } from 'redux/index';
import { useTasksPauseMutation } from 'redux/index';
import { useTasksRescheduleMutation } from 'redux/index';

const Tasks = () => {
  const { data: getTasks, isLoading: loadingGetTasks } = useGetTasksQuery();
  const [tasksPause] = useTasksPauseMutation();
  const [tasksResume] = useTasksResumeMutation();
  const [tasksReschedule] = useTasksRescheduleMutation();

  

  const PauseMutation = async (e, id) => {
    e.preventDefault();
    if (getTasks) {
      await tasksPause(id).unwrap();
    }
  };
  const ResumeMutation = async (e, id) => {
    e.preventDefault();
    if (getTasks) {
      await tasksResume(id).unwrap();
    }
  };
  const RescheduleMutation = async (e, id) => {
    e.preventDefault();
    if (getTasks) {
    }
    await tasksReschedule(id).unwrap();
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        {
          loadingGetTasks ? (
            <PulseLoader
              size={15}
              cssOverride={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              color="#757575"
            />
          ) :
            getTasks?.timer.map((item) => (
              <div key={item.id} className="py-8 flex flex-wrap border-b border-white md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span className="font-semibold title-font text-gray-700">{item.id}</span>
                  <span className="mt-1 text-gray-500 text-sm">12 Jun 2019</span>
                </div>
                <div className="md:flex-grow">
                  <h2 className="text-2xl font-medium text-gray-900 title-font mb-2 pl-96">{item.name}</h2>
                  <p className="leading-relaxed pl-96 pb-14">{item.next_run_time}</p>
                  <div className="-my-5 divide-y-2 divide-gray-100">
                    <div className="py-8 flex flex-wrap md:flex-nowrap">
                      <button onClick={(e) => PauseMutation(e, item.id)} className="flex mx-auto text-white bg-primary border-0 py-2 px-8 focus:outline-none rounded text-lg">Pause</button>
                      <button onClick={(e) => ResumeMutation(e, item.id)} className="flex mx-auto text-white bg-primary border-0 py-2 px-8 focus:outline-none rounded text-lg">Resume</button>
                      <button onClick={(e) => RescheduleMutation(e, item.id)} className="flex mx-auto text-white bg-primary border-0 py-2 px-8 focus:outline-none rounded text-lg">Reschedule</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
        }
      </div>
    </section>
  )

}

export default Tasks