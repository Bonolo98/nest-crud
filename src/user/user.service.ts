import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./create-user-dto";
import { UpdateUserDto } from "./update-user-dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}


    async create( createUserDto: CreateUserDto): Promise<UserEntity> {
        const userData = await this.userRepository.create(createUserDto)
        return this.userRepository.save(userData);
    }


    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }


    async findOne(id: number): Promise<UserEntity> {
        const userData = await this.userRepository.findOneBy({id});
        if(!userData) {
            throw new HttpException(
                'User Not Found', 404,
            )
        }
        return userData;
    }


    async update (id: number, updateUserDto: UpdateUserDto): Promise <UserEntity> {
        const existingUser = await this.findOne(id);
        const userData =  this.userRepository.merge( existingUser, updateUserDto)
        return await this.userRepository.save(userData);
    }


    async remove(id: number): Promise<UserEntity> {
        const existingUser = await this.findOne(id);
        return await this.userRepository.remove(
          existingUser,
        );
}
}