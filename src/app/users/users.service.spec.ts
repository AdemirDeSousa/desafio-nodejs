import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';

const usersEntityList: UsersEntity[] = [
  new UsersEntity({ id: 'b9d63bd9-a80c-47e8-9e6c-e634a58f437d' }),
  new UsersEntity({ id: '26c84979-cfd4-4e56-8a45-2f1c7d6a0217' }),
  new UsersEntity({ id: 'f0e4d3d5-44e4-4cef-8ebf-7f580ae5fcee' }),
];

const updatedUserEntity: UsersEntity = new UsersEntity({
  id: 'b9d63bd9-a80c-47e8-9e6c-e634a58f437d',
  name: 'Ademir',
});

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepo: Repository<UsersEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UsersEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(usersEntityList),
            findOne: jest.fn().mockResolvedValue(undefined),
            findOneOrFail: jest.fn().mockResolvedValue(usersEntityList[0]),
            create: jest.fn().mockReturnValue(usersEntityList[0]),
            save: jest.fn().mockResolvedValue(usersEntityList[0]),
            merge: jest.fn().mockResolvedValue(updatedUserEntity),
            delete: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepo = module.get<Repository<UsersEntity>>(
      getRepositoryToken(UsersEntity),
    );
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersRepo).toBeDefined();
  });

  describe('findAll method', () => {
    it('should return a list of users', async () => {
      const result = await usersService.findAll();

      expect(result).toEqual(usersEntityList);
    });

    it('should return a empty list', async () => {
      jest.spyOn(usersRepo, 'find').mockResolvedValueOnce([]);

      const result = await usersService.findAll();

      expect(result).toEqual([]);
    });

    it('should throw an exception', () => {
      jest.spyOn(usersRepo, 'find').mockRejectedValueOnce(new Error());

      expect(usersService.findAll).rejects.toThrowError();
    });
  });

  describe('findOne method', () => {
    it('should return a user', async () => {
      const result = await usersService.findOne(
        'b9d63bd9-a80c-47e8-9e6c-e634a58f437d',
      );

      expect(result).toEqual(usersEntityList[0]);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(usersRepo, 'findOneOrFail').mockRejectedValueOnce(new Error());

      expect(usersService.findOne).rejects.toThrowError(NotFoundException);
    });
  });

  describe('create method', () => {
    const data: CreateUserDto = {
      name: 'Ademir',
      email: 'email@gmail.com',
      password: 'password',
    };
    it('should create a user', async () => {
      const result = await usersService.create(data);

      expect(result).toEqual(usersEntityList[0]);
    });

    it('should throw an bad request exception', () => {
      jest
        .spyOn(usersRepo, 'findOne')
        .mockResolvedValueOnce(usersEntityList[0]);

      expect(usersService.create(data)).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('should throw an exception', () => {
      jest.spyOn(usersRepo, 'save').mockRejectedValueOnce(new Error());

      expect(usersService.create(data)).rejects.toThrowError();
    });
  });

  describe('update method', () => {
    it('should update a user', async () => {
      const data: UpdateUserDto = {
        name: 'Ademir',
      };

      jest.spyOn(usersRepo, 'save').mockResolvedValueOnce(updatedUserEntity);

      const result = await usersService.update(
        'b9d63bd9-a80c-47e8-9e6c-e634a58f437d',
        data,
      );

      expect(result).toEqual(updatedUserEntity);
    });

    it('should throw a not found exception', () => {
      const data: UpdateUserDto = {
        name: 'Ademir',
      };

      jest.spyOn(usersRepo, 'findOneOrFail').mockRejectedValueOnce(new Error());

      expect(
        usersService.update('b9d63bd9-a80c-47e8-9e6c-e634a58f437d', data),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw an exception', () => {
      const data: UpdateUserDto = {
        name: 'Ademir',
      };

      jest.spyOn(usersRepo, 'save').mockRejectedValueOnce(new Error());

      expect(
        usersService.update('b9d63bd9-a80c-47e8-9e6c-e634a58f437d', data),
      ).rejects.toThrowError();
    });
  });

  describe('delete method', () => {
    it('should delete a user', async () => {
      const result = await usersService.delete(
        'b9d63bd9-a80c-47e8-9e6c-e634a58f437d',
      );

      expect(result).toEqual(undefined);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(usersRepo, 'findOneOrFail').mockRejectedValueOnce(new Error());

      expect(
        usersService.delete('b9d63bd9-a80c-47e8-9e6c-e634a58f437d'),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
