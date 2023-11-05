// export class CreateUserDto {
//     email: string;
//     password: string;
//     name: string;
// }

export interface CreateUserDto {

    /**
     * Primary Key.
     *
     * @format email
     */
    email: string;

    /**
     *
     * @format password
     */
    password: string;

    /**
     *
     * @format name
     */
    name: string;
}