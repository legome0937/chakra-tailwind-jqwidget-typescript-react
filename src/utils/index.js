export const truncate = (addr) => {
  var sep = '...';
  var front = addr.substr(0, 6);
  var back = addr.substr(addr.length - 4);
  return front + sep + back;
};

const retry = (fn, retriesLeft = 5, interval = 1000) => {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            // reject('maximum retries exceeded');
            reject(error);
            return;
          }

          // Passing on "reject" is the important part
          retry(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
};

export default retry;
