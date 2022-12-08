export const fetchApi = (url, options = {}) => {
  //! пример Promise => fetch => then
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((data) => {
        console.log('data:', data);
        resolve(data);
      })
      .catch((response) => {
        //превращаем ошибку объект и передаем дальше в конечный catch
        response.json().then((error) => {
          reject(error);
        });
      });
  });
};
