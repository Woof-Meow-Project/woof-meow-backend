import { ApiOperation, ApiProperty, ApiResponse } from "@nestjs/swagger";

export class Dto {
}
export class GenericRequestDto<T> {

    @ApiProperty({
        example: [new Dto()] || new Dto(),
        description: '데이터',
        type: Dto || [Dto],
    })
    data: T | T[];
}
@ApiResponse({
    status: 200,
    description: '성공',
  })
export class GenericResponseDto<T> {

    @ApiProperty({
        example: true,
        description: '성공여부',
        required: true
    })
    success: boolean = true;

    @ApiProperty({
        example: '성공',
        description: '메시지',
    })
    message?: string;

    @ApiProperty({
        example: [new Dto()] || new Dto(),
        description: '데이터',
        type: Dto || [Dto],
    })
    data: T | T[];

    @ApiProperty({
        example: new Date(),
        description: '요청시간',
    })
    responseTime: Date = new Date();
}

export class Pagination {
    @ApiProperty({
        example: 100,
        description: '전체 개수',
        required: true
    })
    total: number = 0;

    @ApiProperty({
        example: 1,
        description: '현재 페이지',
        required: true
    })
    page: number = 1;

    @ApiProperty({
        example: 10,
        description: '한 페이지에 보여줄 개수',
        required: true
    })
    limit: number = 10;
}

export class PaginationResponseDto<T> extends GenericResponseDto<T> {
    @ApiProperty({
        example: new Pagination(),
        description: '페이지네이션',
        type: Pagination
    })
    pagination: Pagination = new Pagination();
}
