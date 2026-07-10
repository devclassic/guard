import { useHttp } from './http'

const getRealTimeDataByDeviceAddr = async (deviceAddrs: string) => {
  const http = useHttp()
  const res = await http.get('/api/data/getRealTimeDataByDeviceAddr', { params: { deviceAddrs } })
  return res.data.data
}

export default { getRealTimeDataByDeviceAddr }
