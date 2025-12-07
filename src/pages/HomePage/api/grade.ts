import { http } from '@/utils/http';

export interface Me {
  point: number;
  grade: 'EXPLORER' | 'PILOT' | 'COMMANDER';
}

export const getMe = async () => {
  const response = await http.get<Me>('/api/me');
  return response;
};

export interface GradePoint {
  type: 'EXPLORER' | 'PILOT' | 'COMMANDER';
  minPoint: number;
}

export const getGradePointList = async () => {
  const response = await http.get<{ gradePointList: GradePoint[] }>('/api/grade/point');
  return response.gradePointList;
};
