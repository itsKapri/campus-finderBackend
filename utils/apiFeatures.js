// class ApiFeatures {
//     constructor(query, queryStr) {
//         this.query = query;
//         this.queryStr = queryStr;
//     }

//     search() {
//         if (this.queryStr.keyword) {
//             const keyword = {
//                 name: {
//                     $regex: this.queryStr.keyword,
//                     $options: "i",
//                 },
//             };
//             console.log(keyword);
//             this.query = this.query.find(keyword);
//         }
//         return this;
//     }
// }
// module.exports = ApiFeatures;

const search = (query, queryStr) => {
    if (queryStr.keyword) {
      const keyword = {
        name: {
          $regex: queryStr.keyword,
          $options: "i",
        },
      };
      query = query.find(keyword);
    }
    return query;
  };
  
  const filter = (query, queryStr) => {
    if (queryStr.minFees) {
        query = query.where("fees").gte(parseInt(queryStr.minFees));
      }
      if (queryStr.maxFees) {
        query = query.where("fees").lte(parseInt(queryStr.maxFees));
      }      
  
    return query;
  };
  
  module.exports = {
    search,
    filter,
  };
  



