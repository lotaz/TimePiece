export const convertYesNoToBoolean = (value: string) => {
  return value.toLowerCase() === 'yes'
}

export const convertBooleanToYesNo = (value: boolean) => {
  return value ? 'yes' : 'no'
}
