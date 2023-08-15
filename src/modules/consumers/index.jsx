import React from 'react'
import ListItemWrapper from 'components/common/ListItemWrapper';
import { useConsumersResumeMutation } from 'redux/index';
import { useGetConsumersQuery } from 'redux/index'
import { useConsumersPauseMutation } from 'redux/index'
import SpinnerLoader from "../../components/common/SpinnerLoader";
import {BiPauseCircle} from "react-icons/bi";
import {BiPlayCircle} from "react-icons/bi";
import PageHeader from "../../components/common/PageHeader";

const Consumers = () => {
  const { data: getConsumers, isLoading: loadingGetConsumers } = useGetConsumersQuery();
  const [consumersPause] = useConsumersPauseMutation();
  const [consumersResume] = useConsumersResumeMutation();

  const PauseMutation = async (e, tag) => {
    e.preventDefault();
    if (getConsumers) {
      await consumersPause(tag).unwrap();
    }
  };
  const ResumeMutation = async (e, tag) => {
    e.preventDefault();
    if (getConsumers) {
      await consumersResume(tag).unwrap();
    }
  };

  const [statusValues, setStatusValues] = React.useState({});

  React.useEffect(() => {
    if (getConsumers === undefined) {
      return;
    }

    let statuses = {};

    Object.entries(getConsumers).forEach((data) => {
      const [title, consumers] = data;

      consumers.forEach(consumer => {
        statuses[title + "-" + consumer.consumer_tag] = consumer.status;
      });
    });

    setStatusValues(statuses);
  }, [loadingGetConsumers, getConsumers])

  const handleStatusChange = (consumer_tag, status) => {
    let statuses = {};

    Object.entries(getConsumers).forEach((data) => {
      const [title, consumers] = data;

      consumers.forEach(consumer => {
        if (consumer.consumer_tag === consumer_tag) {
          statuses[title + "-" + consumer.consumer_tag] = status;
        } else {
          statuses[title + "-" + consumer.consumer_tag] = consumer.status;
        }
      });
    });

    setStatusValues(statuses);
  };

  return (
      // <></>
    <div className="py-6">
      <div className="flex flex-col">

        <PageHeader
            header={`Consumers (${Object.values(getConsumers === undefined ? {} : getConsumers).reduce((acc, array) => acc + array.length, 0)})`}
            showBack={false}
        />

        {
          loadingGetConsumers ? (
            <SpinnerLoader />
          ) :
          (<div className="flex flex-col gap-4">
              {Object.entries(getConsumers).map((moduleConsumersList) => {
                const [groupTitle, consumersList] = moduleConsumersList;

                return consumersList.map( item => (
                <ListItemWrapper
                  key={item.consumer_tag}
                >
                  <div className="flex justify-between gap-4 pb-3 border-b border-backGround">
                    
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <div className="text-gray text-xs">
                          Tag of consumer:
                        </div>
                        <h4>{item.consumer_tag}</h4>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-gray text-xs">
                          Queue:
                        </div>
                        <h4>{item.queue}</h4>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-gray text-xs">
                          Receiver:
                        </div>
                        <h4>{item.receiver}</h4>
                      </div>
                      <div className="flex flex-col">
                          <div className="text-gray text-xs">
                            Consumer status:
                          </div>
                          <div>{ statusValues[groupTitle + "-" + item.consumer_tag] }</div>
                        </div>
                    </div>
                    <div className="flex flex-col divide-y-2 divide-gray-100">
                        <div className="flex flex-col">
                          <BiPauseCircle onClick={(e) => { PauseMutation(e, item.consumer_tag); handleStatusChange(item.consumer_tag, "paused") }} 
                            className={`text-4xl ${statusValues[groupTitle + "-" + item.consumer_tag] === 'paused' ? 'text-primary' : 'text-gray'} cursor-pointer  mb-3`}
                          />
                          <BiPlayCircle onClick={(e) => { ResumeMutation(e, item.consumer_tag); handleStatusChange(item.consumer_tag, "running") }}
                            className={`text-4xl ${statusValues[groupTitle + "-" + item.consumer_tag] === 'running' ? 'text-primary' : 'text-gray'} cursor-pointer`}
                          />
                        </div>
                    </div>
                    </div>
                </ListItemWrapper>
                ));
              })}
            </div>)
        }
      </div>
    </div>
  )
}

export default Consumers