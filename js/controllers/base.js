"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractService = exports.BaseService = exports.Pagination = exports.RequestQuery = exports.BaseEntity = void 0;
const mongoose_1 = require("mongoose");
class BaseEntity {
}
exports.BaseEntity = BaseEntity;
class RequestQuery {
}
exports.RequestQuery = RequestQuery;
class Pagination {
}
exports.Pagination = Pagination;
class BaseService {
    constructor(user) {
        this.currentUser = user;
        this.currentUser._id = new mongoose_1.Types.ObjectId(user._id);
    }
}
exports.BaseService = BaseService;
class AbstractService extends BaseService {
    create(body) {
        const { currentUser } = this;
        body.createdBy = currentUser._id;
        body.updatedBy = currentUser._id;
        if (currentUser.entity)
            body.entity = currentUser.entity;
        return body;
    }
    getQuery(query) {
        const result = new RequestQuery();
        result.pagination = this.getPaginationQuery(query.pagination);
        result.sort = this.getSortQuery(query.sort);
        result.filter = this.getFilterQuery(query.filter);
        return result;
    }
    getPaginationQuery(query) {
        const pagination = new Pagination();
        pagination.page = query && query.page ? Number.parseInt(query.page.toString(), 10) : 1;
        pagination.limit = query && query.limit ? Number.parseInt(query.limit.toString(), 10) : 10;
        return pagination;
    }
    getSortQuery(query) {
        if (query)
            return JSON.parse(query);
        return {};
    }
    getFilterQuery(query) {
        if (!query)
            return {};
        query = JSON.parse(query);
        if (query.name && (query.name !== ''))
            query.name = { $regex: query.name, $options: "i" };
        return query;
    }
}
exports.AbstractService = AbstractService;
