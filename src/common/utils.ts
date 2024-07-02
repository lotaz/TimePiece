import { AppraisalStatus, AppraisalStatusVietnamese } from './type'

export const convertYesNoToBoolean = (value: string) => {
  return value.toLowerCase() === 'yes'
}

export const convertBooleanToYesNo = (value: boolean) => {
  return value ? 'yes' : 'no'
}

export const getVietnameseStatus = (
  status: AppraisalStatus | string
): string => {
  return AppraisalStatusVietnamese[status] || 'Unknown status'
}
