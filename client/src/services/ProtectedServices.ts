import Client from "./api"

export const CreateNewProject = async (data: any) => {
  const res = await Client.post('/project/new', data)
  return res.data
}