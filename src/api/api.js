// import axios from 'axios'
// import qs from 'qs'

// const httpServer = (type, url, params) => {
//   let promise = new Promise(function (resolve, reject) {
//     // params = qs.stringify(Object.assign(params))
//     if (type == 'get') {
//       axios.get(url, {
//         params
//       }).then(function (res) {
//         console.log(res);
//         resolve(res)
//       }).catch(function (error) {
//         console.log(error);
//         reject(error)
//       });
//     } else if (type == 'post') {
//       axios.post(url, {
//         params
//       }).then(function (res) {
//         console.log(res);
//         resolve(res)
//       }).catch(function (error) {
//         console.log(error);
//         reject(error)
//       });
//     }
//   })
//   return promise
// }

// export default httpServer