import { Test, TestingModule } from '@nestjs/testing';
import { RepositoriesController } from './repositories.controller';
import { RepositoriesService } from './repositories.service';

describe('RepositoriesController', () => {
  let repositoriesController: RepositoriesController;
  let repositoriesService: RepositoriesService;

  beforeEach(async () => {
    const repositoriesServiceMock = {
      getModuleHealth: jest.fn().mockReturnValue({
        status: 'success',
        timestamp: new Date().getTime(),
        message: 'Repositories module is working',
      }),
      getTopRatedRepositories: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepositoriesController],
      providers: [
        {
          provide: RepositoriesService,
          useValue: repositoriesServiceMock,
        },
      ],
    }).compile();

    repositoriesController = module.get<RepositoriesController>(
      RepositoriesController,
    );
    repositoriesService = module.get<RepositoriesService>(RepositoriesService);
  });

  describe('module', () => {
    it('should return "Repositories module is working"', () => {
      const result = repositoriesController.getModuleHealth();

      expect(result).toMatchObject({
        status: 'success',
        message: 'Repositories module is working',
      });

      expect(result).toHaveProperty('timestamp');
    });
  });

  describe('getTopRatedRepositories', () => {
    it('should return top rated repositories when called with valid parameters', async () => {
      const mockResponse = {
        status: 'success',
        result: [],
      };
      const date = '2023-01-01';
      const language = 'TypeScript';
      const limit = 5;

      jest
        .spyOn(repositoriesService, 'getTopRatedRepositories')
        .mockResolvedValue(mockResponse);

      expect(
        await repositoriesController.getTopRatedRepositories(
          date,
          language,
          limit,
        ),
      ).toBe(mockResponse);
    });

    // TODO: Fix error cases' test assertions

    // it('should throw BadRequestException when date parameter is missing', async () => {
    //   const language = 'TypeScript';
    //   const limit = 5;

    //   await expect(
    //     repositoriesController.getTopRatedRepositories(null, language, limit)
    //   ).rejects.toThrow(BadRequestException);
    // });

    // it('should handle and log error when service throws an error', async () => {
    //   const error = new InternalServerErrorException('Failed to fetch repositories');
    //   const date = '2023-01-01';
    //   const language = 'TypeScript';
    //   const limit = 5;

    //   jest.spyOn(repositoriesService, 'getTopRatedRepositories').mockRejectedValue(error);
    //   const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    //   await expect(
    //     repositoriesController.getTopRatedRepositories(date, language, limit)
    //   ).rejects.toThrow(new InternalServerErrorException('Failed to fetch repositories'));

    //   expect(consoleErrorSpy).toHaveBeenCalledWith(0);

    //   consoleErrorSpy.mockRestore();
    // });

    // it('should handle and log error when service throws an error', async () => {
    //   const error = new InternalServerErrorException('Failed to fetch repositories');
    //   const date = '2023-01-01';
    //   const language = 'TypeScript';
    //   const limit = 5;

    //   jest.spyOn(repositoriesService, 'getTopRatedRepositories').mockRejectedValue(error);
    //   const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    //   await expect(
    //     repositoriesController.getTopRatedRepositories(date, language, limit)
    //   ).rejects.toThrow(new InternalServerErrorException('Failed to fetch repositories'));

    //   expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(InternalServerErrorException));

    //   consoleErrorSpy.mockRestore();
    // });
  });
});
