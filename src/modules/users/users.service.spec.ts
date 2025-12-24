import { Test, TestingModule } from '@nestjs/testing';

import { NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/users.repository';
import { UsersService } from './users.service';
import { UserRole } from './enum/user-role.enum';
describe('UserService', () => {
  let service: UsersService;
  let repo: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: {
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get(UserRepository);
  });

  it('should return user when findById is called', async () => {
    repo.findById.mockResolvedValue({
      id: 'abc',
      name: 'Nhan',
      email: 'nhan@gmail.com',
      password: 'hashedPassword',
      posts: [],
      role: UserRole.ADMIN,
    });

    const result = await service.findOne('1');

    expect(result).toEqual({ id: 1, name: 'Nhan' });
    expect(repo.findById('1')).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if user not found', async () => {
    repo.findById.mockResolvedValue(null);

    await expect(service.findById(1)).rejects.toThrow(NotFoundException);
  });

  it('should create user', async () => {
    const dto = { name: 'Nhan', email: 'a@a.com' };
    repo.create.mockResolvedValue({ id: 1, ...dto });

    const result = await service.createUser(dto);

    expect(result).toEqual({ id: 1, ...dto });
    expect(repo.create).toHaveBeenCalledWith(dto);
  });
});
