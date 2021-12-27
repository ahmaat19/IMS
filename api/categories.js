import dynamicAPI from './dynamicAPI'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const url = '/api/setting/categories'

export default function useCategories() {
  const queryClient = useQueryClient()

  // get all categories
  const getCategories = useQuery(
    'categories',
    async () => await dynamicAPI('get', url, {}),
    { retry: 0 }
  )

  // update categories
  const updateCategory = useMutation(
    async (obj) => await dynamicAPI('put', `${url}/${obj._id}`, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries(['categories']),
    }
  )

  // delete categories
  const deleteCategory = useMutation(
    async (id) => await dynamicAPI('delete', `${url}/${id}`, {}),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries(['categories']),
    }
  )

  // add categories
  const addCategory = useMutation(
    async (obj) => await dynamicAPI('post', url, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries(['categories']),
    }
  )

  return { getCategories, updateCategory, deleteCategory, addCategory }
}
