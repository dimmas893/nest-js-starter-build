import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserQueryParamsDto {
  @ApiPropertyOptional({ description: 'Page number', default: 1 })
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Number of items per page', default: 10 })
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Column to search by (e.g., name, email)' })
  search_by?: string;

  @ApiPropertyOptional({ description: 'Search query for filtering' })
  search_query?: string;

  @ApiPropertyOptional({ description: 'Filter type (equal, like, between)', enum: ['equal', 'like', 'between'] })
  filter_type?: 'equal' | 'like' | 'between';

  @ApiPropertyOptional({ description: 'Start value for between filter' })
  start_value?: string;

  @ApiPropertyOptional({ description: 'End value for between filter' })
  end_value?: string;
}

export class UserQueryRequestBodyDto {
  @ApiPropertyOptional({ description: 'Page number', default: 1, example: 1 })
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Number of items per page', default: 10, example: 10 })
  limit?: number = 10;

  @ApiProperty({
    description: 'Filters array for search',
    type: [Object],
    example: [
      {
        search_by: 'name',
        filter_type: 'like',
        search_query: 'a',
      },
      {
        search_by: 'createdAt',
        filter_type: 'between',
        start_value: '2023-01-01',
        end_value: '2024-12-31',
      },
    ],
  })
  filters?: {
    search_by: string;
    filter_type: 'equal' | 'like' | 'between';
    search_query?: string;
    start_value?: string;
    end_value?: string;
  }[];
}