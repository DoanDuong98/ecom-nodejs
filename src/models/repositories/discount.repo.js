'use strict'

const { getUnSelectData, getSelectData } = require("../../utils");

const findAllDiscountUnSelect = async({ limit = 50, page = 1, sort = 'ctime', filter, unSelect, model }) => {
  const skip = (page - 1)*limit;
  const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
  const docs = await model.find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(getUnSelectData(unSelect))
    .lean()
  return docs;
}

const findAllDiscountSelect = async({ limit = 50, page = 1, sort = 'ctime', filter, select, model }) => {
  const skip = (page - 1)*limit;
  const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
  const docs = await model.find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(getSelectData(select))
    .lean()
  return docs;
}

const checkDiscountExists = async({model, filter}) => {
  return await model.findOne(filter).lean()
}

module.exports = {
  findAllDiscountUnSelect,
  findAllDiscountSelect,
  checkDiscountExists
}
