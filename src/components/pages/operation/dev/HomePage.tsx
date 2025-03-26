'use client';
import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';

import CmnTimeInput, { TimeString } from '@/components/common/CmnTimeInput';
import Loading from '@/components/common/Loading';
import { TIME_FORMAT } from '@/constants/constants';
import { useAppSelector } from '@/hook/useRedux';
import dayjs from '@/lib/dayjs';
import { getPrefectureName } from '@/lib/prefectures';
import { RootState } from '@/redux/store';
import { negotiationCarrierService } from '@/services/carrier/negotiation';
import { transOrderService } from '@/services/transaction/transOrder';
import { VehicleDiagramData } from '@/types/negotiation';
const HomePage = (props: { id: string }) => {
  const { id } = props;

  const transOrderApi = transOrderService();
  const negotiationCarrierApi = negotiationCarrierService();

  const [strValidateSemi, setStrValidateSemi] = useState('');
  // const [loading72h, setLoading72h] = useState(false);
  const [loading3h, setLoading3h] = useState(false);
  const [loading2h, setLoading2h] = useState(false);
  const [loading1h, setLoading1h] = useState(false);

  const [loadingUpdateTime, setLoadingUpdateTime] = useState(false);
  const [timeStart, setTimeStart] = useState<TimeString | undefined>(undefined);
  const [timeEnd, setTimeEnd] = useState<TimeString | undefined>(undefined);

  const [isEmergency, setIsEmergency] = useState(false);

  const [data, setData] = useState<VehicleDiagramData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = () => {
    setLoading(true);
    const vehicleCarrierApi = negotiationCarrierService();
    vehicleCarrierApi
      .detailDeliveryAbilityTracking(id)
      .then((result) => {
        setData(result || null);
        setTimeStart(formatDepartureTime(result?.departure_time) as TimeString);
        setTimeEnd(formatArrivalTime(result?.arrival_time) as TimeString);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formatDay = (day: string | undefined) => {
    if (!day) return '--';
    return dayjs(day).format('YYYY年MM月DD日(ddd)');
  };

  const formatDepartureTime = (time?: string) => {
    if (!time) return '00:00';
    const timeFormat = time.replaceAll(':', '');
    return dayjs(timeFormat, TIME_FORMAT.HHMMSS).format(TIME_FORMAT.HH_MM);
  };

  const formatArrivalTime = (time?: string) => {
    if (!time) return '00:00';
    const timeFormat = time.replaceAll(':', '');
    return dayjs(timeFormat, TIME_FORMAT.HHMMSS).format(TIME_FORMAT.HH_MM);
  };

  const regions = useAppSelector((state: RootState) => state.app.locations);

  const handleResponse = (hour: number, response: { status: 'error' | 'success'; message: string }) => {
    if (response.status === 'success') {
      alert(`TransOrderTracking ${hour}h Success: ${response.message}`);
    } else {
      alert(`TransOrderTracking ${hour}h Error: ${response.message}`);
    }
  };

  // const transOrderTracking72h = (id: string) => {
  //   setLoading72h(true);
  //   transOrderService()
  //     .transOrderTracking(id, 72)
  //     .then((response) => {
  //       handleResponse(72, response);
  //     })
  //     .catch(() => {
  //       handleResponse(72, { status: 'error', message: 'Error System' });
  //     })
  //     .finally(() => {
  //       setLoading72h(false);
  //     });
  // };

  const transOrderTracking3h = (id: string) => {
    setLoading3h(true);
    transOrderService()
      .transOrderTracking(id, 3)
      .then((response) => {
        handleResponse(3, response);
      })
      .catch(() => {
        handleResponse(3, { status: 'error', message: 'Error System' });
      })
      .finally(() => {
        setLoading3h(false);
      });
  };

  const transOrderTracking2h = (id: string) => {
    setLoading2h(true);
    transOrderService()
      .transOrderTracking(id, 2)
      .then((response) => {
        handleResponse(2, response);
      })
      .catch(() => {
        handleResponse(2, { status: 'error', message: 'Error System' });
      })
      .finally(() => {
        setLoading2h(false);
      });
  };

  const transOrderTracking1h = (id: string) => {
    setLoading1h(true);
    transOrderService()
      .transOrderTracking(id, 1)
      .then((response) => {
        handleResponse(1, response);
      })
      .catch(() => {
        handleResponse(1, { status: 'error', message: 'Error System' });
      })
      .finally(() => {
        setLoading1h(false);
      });
  };

  const validateSemi = () => {
    negotiationCarrierService()
      .validateSemi({
        vehicle_diagram_item_id: '13',
        type: '1',
      })
      .then((res) => {
        setStrValidateSemi(JSON.stringify(res));
      });
  };

  const trackingStart = () => {
    transOrderApi
      .trackingStart(id)
      .then((result) => {
        console.log(result);
        alert('Start Success');
      })
      .catch((error) => {
        console.error(error);
        alert('Start Error');
      });
  };

  const trackingEnd = () => {
    transOrderApi
      .trackingEnd(id)
      .then((result) => {
        console.log(result);
        alert('End Success');
      })
      .catch((error) => {
        console.error(error);
        alert('End Error');
      });
  };

  const onChangeTime = (data: { timeStart?: TimeString; timeEnd?: TimeString }) => {
    setTimeStart(data.timeStart);
    setTimeEnd(data.timeEnd);
  };

  const updateTime = () => {
    if (!timeStart || !timeEnd) {
      alert('Please select time');
      return;
    }
    setLoadingUpdateTime(true);
    negotiationCarrierApi
      .updateTime({
        vehicle_diagram_item_id: id,
        time_start: timeStart.replace(':', '') as string,
        time_end: timeEnd.replace(':', '') as string,
      })
      .then((res) => {
        console.log(res);
        alert('Update Time Success');
        fetchData();
      })
      .catch((error) => {
        console.error(error);
        alert('Update Time Error');
      })
      .finally(() => {
        setLoadingUpdateTime(false);
      });
  };

  const changeEmergency = (value: boolean) => {
    setIsEmergency(value);
    negotiationCarrierApi
      .updateEmergencyStatus({
        vehicle_diagram_item_id: id,
        emergency_status: value ? '1' : '0',
      })
      .then((res) => {
        console.log(res);
        alert(`Update Emergency Status Success: ${value ? '1' : '0'}`);
      })
      .catch((error) => {
        console.error(error);
        alert(`Update Emergency Status Error: ${value ? '1' : '0'}`);
      });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className='flex flex-col w-full h-full bg-white p-4'>
          <div className='flex flex-col py-2 px-6 w-full h-full border border-gray-200'>
            <div className='grid grid-cols-3 gap-4'>
              {/* <Button
            radius='sm'
            className='text-base text-primary font-bold px-8 py-4 text-white'
            color='primary'
            isLoading={loading72h}
            onPress={() => transOrderTracking72h(id)}
          >
            72h
          </Button> */}
              <Button
                radius='sm'
                className='text-base text-primary font-bold px-8 py-4 text-white'
                color='primary'
                isLoading={loading3h}
                onPress={() => transOrderTracking3h(id)}
              >
                3h
              </Button>
              <Button
                radius='sm'
                className='text-base text-primary font-bold px-8 py-4 text-white'
                color='primary'
                isLoading={loading2h}
                onPress={() => transOrderTracking2h(id)}
              >
                2h
              </Button>
              <Button
                radius='sm'
                className='text-base text-primary font-bold px-8 py-4 text-white'
                color='primary'
                isLoading={loading1h}
                onPress={() => transOrderTracking1h(id)}
              >
                1h
              </Button>
            </div>
          </div>
          <div className='mt-4 flex flex-col py-2 px-6 w-full h-full border border-gray-200'>
            <Button onPress={validateSemi}>天気を見る</Button>
            <div className='text-base text-primary font-bold'>{strValidateSemi}</div>
          </div>
          <div className='mt-4 flex items-center justify-between py-2 px-6 w-full h-full border border-gray-200'>
            <Button
              radius='sm'
              className='text-base text-primary font-bold min-w-[8.5rem] h-14 px-8 py-4 text-white'
              color='primary'
              onPress={() => trackingStart()}
            >
              Start
            </Button>

            <Button
              radius='sm'
              className='text-base text-primary font-bold min-w-[8.5rem] h-14 px-8 py-4 text-white'
              color='primary'
              onPress={() => trackingEnd()}
            >
              End
            </Button>
          </div>
          <div className='mt-4 py-2 px-6 w-full h-full border border-gray-200'>
            <div className='text-primary text-sm h-6 leading-[1.875rem] font-normal'>運行情報</div>

            <div className='flex flex-col text-sm h-full font-normal leading-5 gap-1'>
              <div className='flex items-center'>
                便 :
                <p className='ml-2'>
                  {formatDay(data?.day)}
                  <span className='ml-2'>{data?.trip_name ? `${data?.trip_name} 便` : ''}</span>
                </p>
              </div>
              <div className='flex items-center'>
                運送区間 :
                <span className='mx-2'>{(data && getPrefectureName(regions, data?.departure_from)) || ''}</span>～
                <span className='ml-2'>{(data && getPrefectureName(regions, data?.arrival_to)) || ''}</span>
              </div>
              <div className='flex items-center'>
                運送時間 : 出発時刻
                <span className='ml-2'>{formatDepartureTime(data?.departure_time)}</span> ～ 到着時刻
                <span className='ml-2'>{formatArrivalTime(data?.arrival_time)}</span>
              </div>
              <div className='flex items-center'>
                カットオフ時間 :<span className='ml-2'>1時間前 0 円</span>
              </div>
            </div>
          </div>
          <div className='mt-4 py-2 px-6 w-full h-full border border-gray-200'>
            <span className='text-lg font-bold'>運行スケジュール更新</span>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <span className='text-base mr-4'>運行時間</span>
                <CmnTimeInput
                  classNameWrap='w-44 min-w-44'
                  size='md'
                  validateRange={false}
                  showBtnDelete={true}
                  onChangeTime={onChangeTime}
                  defaultTimeStart={timeStart}
                  defaultTimeEnd={timeEnd}
                />
              </div>
              <Button
                radius='sm'
                className='text-base text-primary font-bold min-w-[8.5rem] h-14 px-8 py-4 text-white'
                color='primary'
                isLoading={loadingUpdateTime}
                isDisabled={!timeStart || !timeEnd || timeStart > timeEnd}
                onPress={() => updateTime()}
              >
                入力確定
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
