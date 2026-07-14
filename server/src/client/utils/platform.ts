import { useHttp } from './http'
import { format } from 'date-fns'

const getRealTimeDataByDeviceAddr = async (deviceAddrs: string) => {
  const http = useHttp()
  const res = await http.get('/api/data/getRealTimeDataByDeviceAddr', { params: { deviceAddrs } })
  return res.data.data
}

const alarmRecordList = async (
  deviceAddr: string,
  nodeId = -1,
  startTime = '2026-01-01 00:00:00',
  endTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
) => {
  const http = useHttp()
  const res = await http.get('/api/data/alarmRecordList', {
    params: { deviceAddr, nodeId, startTime, endTime },
  })
  return res.data.data
}

const historyList = async (
  deviceAddr: string,
  nodeId = -1,
  startTime = '2026-01-01 00:00:00',
  endTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
) => {
  const http = useHttp()
  const res = await http.get('/api/data/historyList', {
    params: { deviceAddr, nodeId, startTime, endTime },
  })
  return res.data.data
}

export default { getRealTimeDataByDeviceAddr, alarmRecordList, historyList }
