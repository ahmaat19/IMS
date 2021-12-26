import dynamicAPI from './dynamicAPI'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const url = '/api/setting/locations'

export default function useLocations() {
  const queryClient = useQueryClient()

  // get all locations
  const getLocations = useQuery(
    'locations',
    async () => await dynamicAPI('get', url, {}),
    { retry: 0 }
  )

  // update locations
  const updateLocation = useMutation(
    async (obj) => await dynamicAPI('put', `${url}/${obj._id}`, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries(['locations']),
    }
  )

  // delete locations
  const deleteLocation = useMutation(
    async (id) => await dynamicAPI('delete', `${url}/${id}`, {}),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries(['locations']),
    }
  )

  // add locations
  const addLocation = useMutation(
    async (obj) => await dynamicAPI('post', url, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries(['locations']),
    }
  )

  return { getLocations, updateLocation, deleteLocation, addLocation }
}
