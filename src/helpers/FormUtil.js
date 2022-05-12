export const limitInput = (val, limit) => {
  if (val.length >= limit) {
    return val.substring(0, limit)
  }

  return val
}
