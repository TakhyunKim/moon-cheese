import { Box, Flex, styled } from 'styled-system/jsx';
import { ProgressBar, Spacing, Text } from '@/ui-lib';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getGradePointList, getMe } from '../api/grade';

// TODO: 로딩, Error UI 보강
function CurrentLevelSection() {
  const { data: me } = useSuspenseQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });

  const currentGrade = me.grade;
  const currentPoint = me.point;
  const nextGradePoint = useNextGradePoint();
  const leftToNextGradePoint = nextGradePoint - currentPoint;
  const isMaxGrade = leftToNextGradePoint === 0;
  const progressToNextGrade = isMaxGrade ? 1 : currentPoint / nextGradePoint;

  return (
    <styled.section css={{ px: 5, py: 4 }}>
      <Text variant="H1_Bold">현재 등급</Text>

      <Spacing size={4} />

      <Box bg="background.01_white" css={{ px: 5, py: 4, rounded: '2xl' }}>
        <Flex flexDir="column" gap={2}>
          <Text variant="H2_Bold">{currentGrade}</Text>

          <ProgressBar value={progressToNextGrade} size="xs" />

          <Flex justifyContent="space-between">
            <Box textAlign="left">
              <Text variant="C1_Bold">현재 포인트</Text>
              <Text variant="C2_Regular" color="neutral.03_gray">
                {currentPoint}p
              </Text>
            </Box>
            <Box textAlign="right">
              <Text variant="C1_Bold">다음 등급까지</Text>
              <Text variant="C2_Regular" color="neutral.03_gray">
                {isMaxGrade ? '최고 등급' : `${leftToNextGradePoint}p`}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </styled.section>
  );
}

function useNextGradePoint() {
  const { data: me } = useSuspenseQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });
  const { data: gradePointList } = useSuspenseQuery({
    queryKey: ['gradePointList'],
    queryFn: getGradePointList,
  });

  const currentGrade = me.grade;

  switch (currentGrade) {
    case 'EXPLORER':
      return gradePointList.find(point => point.type === 'PILOT')!.minPoint;
    case 'PILOT':
      return gradePointList.find(point => point.type === 'COMMANDER')!.minPoint;
    case 'COMMANDER':
      return 0;
  }
}

export default CurrentLevelSection;
