import { api } from './api-client'

type GetBillingsResponse = {
  billings: {
    seats: {
      amount: number
      unit: number
      price: number
    }
    projects: {
      amount: number
      unit: number
      price: number
    }
    total: number
  }
}

export async function getBillings(organization: string) {
  const result = await api
    .get(`organizations/${organization}/billings`, {})
    .json<GetBillingsResponse>()

  return result
}
