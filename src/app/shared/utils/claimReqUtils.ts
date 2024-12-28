import { APP_USER_ROLES, USER_GENDER } from '../constants/constants';

export const claimReqUtils = {
  adminOnly: (claim: any) => claim.Role === APP_USER_ROLES.ADMIN,

  adminAndTeacher: (claim: any) =>
    claim.Role === APP_USER_ROLES.ADMIN ||
    claim.Role === APP_USER_ROLES.TEACHER,

  genderFemaleAgeUnderTen: (claim: any) =>
    parseInt(claim.Age) < 10 && claim.Gender === USER_GENDER.FEMALE,

  maternityLeaveApplicable: (claim: any) =>
    claim.Role === APP_USER_ROLES.TEACHER &&
    claim.Gender === USER_GENDER.FEMALE,

  libraryMembersOnly: (claim: any) =>
    claim.LibraryId !== null &&
    claim.LibraryId !== undefined &&
    claim.LibraryId !== '',

  studentOnly: (claim: any) => claim.Role === APP_USER_ROLES.STUDENT,

  teacherOnly: (claim: any) => claim.Role === APP_USER_ROLES.TEACHER,
};
