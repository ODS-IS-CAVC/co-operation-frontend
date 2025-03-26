'use client';
import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';

import Loading from '@/components/common/Loading';
import { DATE_FORMAT, TIME_FORMAT } from '@/constants/constants';
import { useAppSelector } from '@/hook/useRedux';
import dayjs from '@/lib/dayjs';
import { getPrefectureName } from '@/lib/prefectures';
import { cn } from '@/lib/utils';
import { RootState } from '@/redux/store';
import { negotiationCarrierService } from '@/services/carrier/negotiation';
import { StatusVehicleDiagram, VehicleDiagramData } from '@/types/negotiation';

interface HomePageProps {
  id: string;
}

const HomePage = (props: HomePageProps) => {
  const { id } = props;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<VehicleDiagramData | null>(null);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      const vehicleCarrierApi = negotiationCarrierService();
      vehicleCarrierApi
        .detailDeliveryAbilityTracking(id)
        .then((result) => {
          setData(result || null);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchData();
  }, [id]);

  const formatDay = (day: string | undefined) => {
    if (!day) return '--';
    return dayjs(day).format('YYYY年MM月DD日(ddd)');
  };

  const formatTime = (time: string | undefined) => {
    if (!time) return '00:00';
    return dayjs(time, TIME_FORMAT.HHMMSS).format(TIME_FORMAT.HH_MM);
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

  const getMobitiHubStartTime = () => {
    if (data?.departure_time) {
      // cutoffTrailer1 = max of key in object cut_off_price
      const cutoffTrailer1 =
        data.vehicle_diagram_item_trailer && data.vehicle_diagram_item_trailer[0]?.cut_off_price
          ? Math.max(...Object.keys(data.vehicle_diagram_item_trailer[0].cut_off_price).map(Number))
          : 0;
      const cutoffTrailer2 = data.vehicle_diagram_item_trailer[1]?.cut_off_price
        ? Math.max(...Object.keys(data.vehicle_diagram_item_trailer[1].cut_off_price).map(Number))
        : 0;
      //cutoffTime  = max of cutoffTrailer1, cutoffTrailer2
      const cutoffTime = Math.max(cutoffTrailer1, cutoffTrailer2);

      const mobitiHubStartTime = dayjs(data?.departure_time, 'HH:mm')
        .subtract(cutoffTime * 60, 'minutes')
        .format('HH:mm');
      const mobitiHubEndTime = dayjs(data?.departure_time, 'HH:mm').add(15, 'minutes').format('HH:mm');
      return `${mobitiHubStartTime}-${mobitiHubEndTime}`;
    }
    return '';
  };

  const getMobitiHubEndTime = () => {
    if (data?.arrival_time) {
      const mobitiHubStartTime = dayjs(data?.arrival_time, 'HH:mm').subtract(15, 'minutes').format('HH:mm');
      const mobitiHubEndTime = dayjs(data?.arrival_time, 'HH:mm')
        .add(3 * 60, 'minutes')
        .format('HH:mm');
      return `${mobitiHubStartTime}-${mobitiHubEndTime}`;
    }
    return '';
  };

  const getTrailer = (data?.vehicle_diagram_allocations || []).filter((item) => item?.vehicle_type === 2);

  return (
    <>
      {loading ? (
        <Loading />
      ) : data ? (
        <>
          <div className='flex flex-col w-full h-full bg-white p-4'>
            <div className='flex flex-col gap-3 py-2 px-6 border border-gray-200 mb-3'>
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

              {/* <div>
                <p className='text-primary text-sm leading-[1.875rem] font-normal'>運行編成</p>
                <div className='text-sm leading-[1.875rem] font-normal flex items-center'>
                  <p className='w-[50%]'>トラクタ : 沼津 100 あ 12-78 日野 プロフィア</p>
                  <p className='flex-1'>所有者 : 株式会社キャリアA</p>
                </div>
                <div className='text-sm leading-[1.875rem] font-normal flex items-center'>
                  <p className='w-[50%]'>トレーラ : ドライ 沼津 100 あ 56-56 トレクス トレーラ</p>
                  <div className='flex-1 flex items-center justify-between'>
                    <p>所有者 : 株式会社キャリアA</p>
                    <p>荷主 : 株式会社シッパーA</p>
                  </div>
                </div>
                <div className='text-sm leading-[1.875rem] font-normal flex items-center'>
                  <p className='w-[50%]'>トレーラ : ドライ 沼津 100 あ 56-78 トレクス トレーラ</p>
                  <div className='flex-1 flex items-center justify-between'>
                    <p>所有者 : 株式会社キャリアA</p>
                    <p>荷主 : 株式会社シッパーB</p>
                  </div>
                </div>
              </div> */}

              <div>
                <p className='text-primary text-sm leading-[1.875rem] font-normal'>モビリティハブ情報</p>
                {/* <div className='flex flex-col text-sm h-full font-normal leading-5 gap-1'>
                  <div className='text-sm leading-[1.875rem] font-normal'>
                    <p>
                      駿河湾沼津モビリティハブ <span className='px-14'>予約 : 完了</span>
                      予約時刻 : 03:20-06:20
                    </p>
                    <p>
                      沼津 100 あ 56-56 トレクス トレーラ<span className='pl-8'>予約スペース:A001</span>
                    </p>
                    <p>
                      沼津 100 あ 56-78 トレクス トレーラ<span className='pl-8'>予約スペース:B015</span>
                    </p>
                  </div>
                </div>

                <div className='flex flex-col text-sm h-full font-normal leading-5 gap-1 mt-4'>
                  <div className='text-sm leading-[1.875rem] font-normal'>
                    <p>
                      浜松モビリティハブ <span className='px-14'> 予約 : 完了</span>
                      予約時刻 : 07:49-08:49
                    </p>
                    <p>
                      沼津 100 あ 56-56 トレクス トレーラ<span className='pl-8'>予約スペース:C203</span>
                    </p>
                    <p>
                      沼津 100 あ 56-78 トレクス トレーラ<span className='pl-8'>予約スペース:E203</span>
                    </p>
                  </div>
                </div> */}
                <div className='flex flex-col space-y-2'>
                  <div className='flex flex-wrap items-center font-bold text-base leading-7'>
                    <div className='w-1/3'>
                      <span>{data?.departure_from ? getPrefectureName(regions, data?.departure_from) : ''}</span>
                    </div>
                    <div className='w-1/5 mr-2'>
                      <span className='whitespace-nowrap'>予約ステータス : 完了</span>
                    </div>
                    <div className='flex-1'>
                      {`予約日時 : ${data?.day ? dayjs(data?.day).locale('ja').format(DATE_FORMAT.JAPANESE) : ''}${getMobitiHubStartTime()}`}
                    </div>
                  </div>
                  {(data?.vehicle_diagram_item_trailer || []).map((value, index) => (
                    <div className='flex items-center text-base leading-7'>
                      <div className='w-1/3'>
                        <span>
                          {`${getTrailer[index]?.vehicle_info?.registration_area_code || ''} ${getTrailer[index]?.vehicle_info?.registration_group_number || ''} ${getTrailer[index]?.vehicle_info?.registration_character || ''} ${getTrailer[index]?.vehicle_info?.registration_number_1 || ''}-${getTrailer[index]?.vehicle_info?.registration_number_2 || ''} ${getTrailer[index]?.vehicle_info?.vehicle_name || ''}`}
                        </span>
                      </div>
                      <div className='w-1/5'>
                        <span>{index === 0 ? '予約スペース:21453354856' : '予約スペース:21453354856'}</span>
                      </div>
                      <div className='flex-1'></div>
                    </div>
                  ))}
                </div>

                <div className='mt-4 flex flex-col space-y-2'>
                  <div className='flex flex-wrap items-center font-bold text-base leading-7'>
                    <div className='w-1/3'>
                      <span>{data?.arrival_to ? getPrefectureName(regions, data?.arrival_to) : ''}</span>
                    </div>
                    <div className='w-1/5 mr-2'>
                      <span className='whitespace-nowrap'>予約ステータス : 完了</span>
                    </div>
                    <div className='flex-1'>
                      {`予約日時 : ${data?.day ? dayjs(data?.day).locale('ja').format(DATE_FORMAT.JAPANESE) : ''}${getMobitiHubEndTime()}`}
                    </div>
                  </div>
                  {(data?.vehicle_diagram_item_trailer || []).map((value, index) => (
                    <div className='flex items-center text-base leading-7'>
                      <div className='w-1/3'>
                        <span>
                          {`${getTrailer[index]?.vehicle_info?.registration_area_code || ''} ${getTrailer[index]?.vehicle_info?.registration_group_number || ''} ${getTrailer[index]?.vehicle_info?.registration_character || ''} ${getTrailer[index]?.vehicle_info?.registration_number_1 || ''}-${getTrailer[index]?.vehicle_info?.registration_number_2 || ''} ${getTrailer[index]?.vehicle_info?.vehicle_name || ''}`}
                        </span>
                      </div>
                      <div className='w-1/5'>
                        <span>{index === 0 ? '予約スペース:21453354856' : '予約スペース:21453354856'}</span>
                      </div>
                      <div className='flex-1'></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='flex flex-col py-2 px-6 w-full h-full border border-gray-200'>
              <div className='text-primary text-sm leading-[1.875rem] font-normal'>運行状況</div>

              <div>
                {(data?.vehicle_diagram_item_tracking?.slice()?.reverse() || []).map((item, index) => (
                  <div key={index} className='mt-3 flex flex-row gap-6 items-start text-sm font-normal leading-6'>
                    <div className='flex flex-col'>
                      <p className='text-nowrap'>{formatDay(item?.operation_date)}</p>
                      <p className='self-end'>{formatTime(item?.operation_time)}</p>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-3'>
                      <div
                        className={cn(
                          'w-4 h-4 rounded-full bg-[#D9D9D9]',
                          item?.status === StatusVehicleDiagram.FINISH && 'bg-primary',
                        )}
                      />

                      {index + 1 !== (data?.vehicle_diagram_item_tracking || []).length ? (
                        <div className='w-0.5 h-12 bg-[#D9D9D9]' />
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className='flex flex-col'>
                      <p
                        className={cn(
                          'text-xs font-medium',
                          item?.status === StatusVehicleDiagram.ERROR &&
                            'bg-[#FFC7C2] text-[#555555] w-[7.25rem] py-1 rounded-full text-center',
                        )}
                      >
                        {item?.label || ''}
                      </p>
                      {item?.message ? (
                        <div
                          className='text-sm font-normal leading-6'
                          dangerouslySetInnerHTML={{ __html: item.message }}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className='flex justify-end'>
                <Button
                  radius='sm'
                  className='text-base text-primary font-bold min-w-[8.5rem] h-14 px-8 py-4 text-white'
                  color='primary'
                  onPress={() =>
                    window.open(`https://track-web-app.luffy-stg.ttmi-sg.com/tracks/${data?.sip_track_id}`, '_blank')
                  }
                >
                  現在走行位置確認
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default HomePage;
