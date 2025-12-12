import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export interface IUserRepository {
  create(userData: CreateUserDto): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
  findByIdWithPassword(id: string): Promise<User | null>;
}
