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


// need to modify
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




