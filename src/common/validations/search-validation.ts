export class SearchValidation {
  static validateSearchFields(query: any, allowedFields: string[]): { isValid: boolean, errors: string[] } {
    const errors: string[] = [];
    const validFilterTypes = ['equal', 'like', 'between']; // Daftar tipe filter yang valid

    if (query.filters && Array.isArray(query.filters)) {
      query.filters.forEach((filter) => {
        const { search_by, filter_type } = filter;

        // Validasi search_by (apakah field diperbolehkan untuk pencarian)
        if (!allowedFields.includes(search_by)) {
          errors.push(`Field ${search_by} is not allowed for searching.`);
        }

        // Validasi filter_type (harus salah satu dari 'equal', 'like', 'between')
        if (!validFilterTypes.includes(filter_type)) {
          errors.push(`Filter type ${filter_type} is not valid. Allowed values are 'equal', 'like', 'between'.`);
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
