import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyZodValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyZodValidation.academicFacultyZodSchema),
  academicFacultyController.createAcademicFaculty,
);

// update a faculty
router.patch('/:id', academicFacultyController.updateFaculty);

// get a single semester
router.get('/:id', academicFacultyController.getASingleFaculty);

// delete faculty
router.delete('/:id', academicFacultyController.deleteFaculty);

// get all faculty with pagination search and filter
router.get('/get-all-faculty', academicFacultyController.getAllFaculty);

export const FacultyRoute = router;
