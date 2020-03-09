export const fetchSuccess = ((apiData = {}) => {
  console.log("fetch success");
  return {
      type: 'FETCH_SUCCESS',
      apiData,
      err : null
    }
});

export const fetchError = (err) => ({
  type: 'FETCH_ERROR',
  apiData : null,
  err
});