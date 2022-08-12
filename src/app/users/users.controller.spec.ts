import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';

const usersEntityList: UsersEntity[] = [
  new UsersEntity({ id: 'b9d63bd9-a80c-47e8-9e6c-e634a58f437d' }),
  new UsersEntity({ id: '26c84979-cfd4-4e56-8a45-2f1c7d6a0217' }),
  new UsersEntity({ id: 'f0e4d3d5-44e4-4cef-8ebf-7f580ae5fcee' }),
];

const newUserEntity: UsersEntity = new UsersEntity({
  name: 'Ademir',
  email: 'email@gmail.com',
  password: 'password',
});

const updatedUserEntity: UsersEntity = new UsersEntity({
  name: 'Ademir de Sousa',
});

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(usersEntityList),
            findOne: jest.fn().mockResolvedValue(usersEntityList[0]),
            create: jest.fn().mockResolvedValue(newUserEntity),
            update: jest.fn().mockResolvedValue(updatedUserEntity),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('get method', () => {
    it('should return a users list', async () => {
      const result = await usersController.get();

      expect(result).toEqual(usersEntityList);
    });

    it('should return a empty list', async () => {
      jest.spyOn(usersService, 'findAll').mockResolvedValue([]);

      const result = await usersController.get();

      expect(result).toEqual([]);
    });

    it('should throw an exception', () => {
      jest.spyOn(usersService, 'findAll').mockRejectedValueOnce(new Error());

      expect(usersController.get()).rejects.toThrowError();
    });
  });

  describe('getOne method', () => {
    it('should return a user', async () => {
      const result = await usersController.getOne(
        'b9d63bd9-a80c-47e8-9e6c-e634a58f437d',
      );

      expect(result).toEqual(usersEntityList[0]);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(usersService, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());

      expect(
        usersController.getOne('b9d63bd9-a80c-47e8-9e6c-e634a58f437d'),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('post method', () => {
    const data: CreateUserDto = {
      name: 'Ademir',
      email: 'email@gmail.com',
      password: 'password',
    };
    it('should create a new user', async () => {
      const result = await usersController.post(data);

      expect(result).toEqual(newUserEntity);
    });

    it('should throw an exception', () => {
      jest.spyOn(usersService, 'create').mockRejectedValueOnce(new Error());

      expect(usersController.post(data)).rejects.toThrowError();
    });
  });

  describe('put method', () => {
    const data: UpdateUserDto = {
      name: 'Ademir editado',
    };
    it('should update user', async () => {
      const result = await usersController.put(
        'b9d63bd9-a80c-47e8-9e6c-e634a58f437d',
        data,
      );

      expect(result).toEqual(updatedUserEntity);
    });

    it('should throw an exception', () => {
      jest.spyOn(usersService, 'update').mockRejectedValueOnce(new Error());

      expect(
        usersController.put('b9d63bd9-a80c-47e8-9e6c-e634a58f437d', data),
      ).rejects.toThrowError();
    });
  });

  describe('delete method', () => {
    it('should remove a user', async () => {
      const result = await usersController.delete(
        'b9d63bd9-a80c-47e8-9e6c-e634a58f437d',
      );

      expect(result).toBe(undefined);
    });

    it('should throw an exception', () => {
      jest.spyOn(usersService, 'delete').mockRejectedValueOnce(new Error());

      expect(
        usersController.delete('b9d63bd9-a80c-47e8-9e6c-e634a58f437d'),
      ).rejects.toThrowError();
    });
  });
});
