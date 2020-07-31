import axios from 'axios'

const apiHost = process.env.API_SERVER_HOST
const apiPort = process.env.API_SERVER_PORT
const apiVersion = process.env.API_VERSION
const baseUrl = `${apiHost}:${apiPort}/${apiVersion}`

const getSprints: any = async (sprint: string) => {
  sprint = sprint === 'today' ? '' : sprint
  const { data } = await axios
    .get(`${baseUrl}/getSprints`, {
      params: {
        ...(sprint ? { sprint: sprint } : {}),
      },
    })
    .catch((err) => {
      return err.response
    })

  Object.keys(data).forEach((key) => {
    data[key] = data[key].replace(/-/g, '/')
  })

  return data
}

const getUsers: any = async (userId: string) => {
  const { data } = await axios
    .get(`${baseUrl}/getUsers`, {
      params: {
        ...(userId ? { user_id: userId } : {}),
      },
    })
    .catch((err) => {
      return err.response
    })

  return data
}

type OperationArgs = {
  userId?: string
  sprint?: string
  month?: string
}

const getOperations: any = async (args: OperationArgs) => {
  const { data } = await axios
    .get(`${baseUrl}/getOperations`, {
      params: {
        ...(args.userId ? { user_id: args.userId } : {}),
        ...(args.sprint ? { sprint: args.sprint } : {}),
        ...(args.month ? { month: args.month } : {}),
      },
    })
    .catch((err) => {
      return err.response
    })

  return data
}

export { getSprints, getUsers, getOperations }
