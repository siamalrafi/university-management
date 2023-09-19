import ApiError from '../../../errors/ApiErrors';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagination';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import status from 'http-status';

// create a semester
const createAcademicSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (
    !(
      (payload.title === 'Spring' && payload.code === '01') ||
      (payload.title === 'Summer' && payload.code === '02') ||
      (payload.title === 'Fall' && payload.code === '03')
    )
  ) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

// get all semester
const getAllSemester = async (
  filters: IAcademicSemesterFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters;

  // this is for search
  const academicSemesterSearchFiled = ['title', 'year', 'code'];
  const andCconditions = [];
  if (searchTerm) {
    andCconditions.push({
      $or: academicSemesterSearchFiled.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // this is for filter part

  if (Object.keys(filtersData).length) {
    andCconditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions =
    andCconditions.length > 0 ? { $and: andCconditions } : {};

  // this is for pagination

  const { page = 1, limit = 10 } = paginationOption;
  const skip = (page - 1) * limit;

  const result = await AcademicSemester.find(whereConditions)
    .sort({
      createdAt: 'desc',
      year: 'desc',
      code: 'desc',
    })
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get a single semester
const getASingleSemester = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

// update a semester
const updateSemeter = async (
  id: string,
  payload: Partial<IAcademicSemester>,
) => {
  if (
    !(
      (payload.title === 'Spring' && payload.code === '01') ||
      (payload.title === 'Summer' && payload.code === '02') ||
      (payload.title === 'Fall' && payload.code === '03')
    )
  ) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// delete a semester
const deleteSemester = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

export const academicSemesterService = {
  createAcademicSemester,
  getAllSemester,
  getASingleSemester,
  updateSemeter,
  deleteSemester,
};
