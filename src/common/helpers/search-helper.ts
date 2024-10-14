import { Op } from "sequelize";
import { UserQueryParamsDto, UserQueryRequestBodyDto } from "src/user/dto/user.dto";

export class SearchHelper {
  static buildSearchQuery(query: UserQueryParamsDto, allowedFields: string[]): any {
    const searchConditions: any = {};

    if (query.search_by && allowedFields.includes(query.search_by)) {
      const column = query.search_by;

      switch (query.filter_type) {
        case 'equal':
          searchConditions[column] = { [Op.eq]: query.search_query };
          break;

        case 'like':
          searchConditions[column] = { [Op.like]: `%${query.search_query}%` };
          break;

        case 'between':
          if (query.start_value && query.end_value) {
            searchConditions[column] = { [Op.between]: [query.start_value, query.end_value] };
          }
          break;

        default:
          searchConditions[column] = { [Op.like]: `%${query.search_query}%` };
      }
    }

    return searchConditions;
  }

  static buildSearchRequestBodyQuery(query: UserQueryRequestBodyDto, allowedFields: string[]): any {
    const searchConditions: any = {};

    if (query.filters && Array.isArray(query.filters)) {
      query.filters.forEach((filter) => {
        const { search_by, filter_type, search_query, start_value, end_value } = filter;

        if (allowedFields.includes(search_by)) {
          switch (filter_type) {
            case 'equal':
              searchConditions[search_by] = { [Op.eq]: search_query };
              break;

            case 'like':
              searchConditions[search_by] = { [Op.like]: `%${search_query}%` };
              break;

            case 'between':
              if (start_value && end_value) {
                searchConditions[search_by] = { [Op.between]: [start_value, end_value] };
              }
              break;

            default:
              searchConditions[search_by] = { [Op.like]: `%${search_query}%` };
          }
        }
      });
    }

    return searchConditions;
  }
}
