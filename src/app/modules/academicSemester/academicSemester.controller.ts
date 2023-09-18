import { academicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { IAcademicSemester } from './academicSemester.interface';
import pick from '../../../shared/pick';
import { responseForData } from '../../../shared/sendResponse';

// create a semester
const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const academicSemesterData = req.body;
    console.log(academicSemesterData);
    const result =
      await academicSemesterService.createAcademicSemester(
        academicSemesterData,
      );
    responseForData.sendResponseForCreate<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created Successful',
      data: result,
    });
    // next();
  },
);

// get all semester with pagination sorting filter and search
const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'title', 'code', 'year']);
  const paginationOption = pick(req.query, [
    'limit',
    'page',
    'sortBy',
    'sortOrder',
  ]);

  const result = await academicSemesterService.getAllSemester(
    filters,
    paginationOption,
  );

  responseForData.sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Getting Successful',
    data: result.data,
    meta: result.meta,
  });
  // next();
});

// get a single semester
const getASingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicSemesterService.getASingleSemester(id);

  responseForData.sendResponseForCreate<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Getting Successful',
    data: result,
  });
});

// update a semester
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await academicSemesterService.updateSemeter(id, updateData);

  responseForData.sendResponseForCreate<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Update Successful',
    data: result,
  });
});

// delete a semeseter
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicSemesterService.deleteSemester(id);

  responseForData.sendResponseForCreate<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Delete Successful',
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
  getAllSemester,
  getASingleSemester,
  updateSemester,
  deleteSemester,
};
