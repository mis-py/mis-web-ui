import React from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import { useConsumersResumeMutation } from 'redux/index';
import { useGetConsumersQuery } from 'redux/index'
import { useConsumersPauseMutation } from 'redux/index'

const Consumers = () => {
  const { data: getConsumers, isLoading: loadingGetConsumers } = useGetConsumersQuery();
  const [consumersPause] = useConsumersPauseMutation();
  const [consumersResume] = useConsumersResumeMutation();

  const PauseMutation = async (e) => {
    e.preventDefault();
    if (getConsumers) {
      await consumersPause().unwrap();
    }
  };
  const ResumeMutation = async (e) => {
    e.preventDefault();
    if (getConsumers) {
      await consumersResume().unwrap();
    }
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        {
          loadingGetConsumers ? (
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
            getConsumers?.timer.map((item) => (
              <div key={item.consumer_tag} className="py-8 flex flex-wrap border-b border-white md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span className="font-semibold title-font text-gray-700">{item.consumer_tag}</span>
                  <span className="mt-1 text-gray-500 text-sm">12 Jun 2019</span>
                </div>
                <div className="md:flex-grow">
                  <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{item.queue}</h2>
                  <p className="leading-relaxed">{item.receiver}</p>
                  <div className="-my-5 divide-y-2 divide-gray-100">
                  <div className="py-8 flex flex-wrap md:flex-nowrap">
                    <button onClick={PauseMutation} className="flex mx-auto text-white bg-primary border-0 py-2 px-8 focus:outline-none rounded text-lg">Pause</button>
                    <button onClick={ResumeMutation} className="flex mx-auto text-white bg-primary border-0 py-2 px-8 focus:outline-none rounded text-lg">Resume</button>
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

export default Consumers