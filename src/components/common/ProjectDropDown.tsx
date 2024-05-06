import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { Option, Select, selectClasses } from '@mui/joy';
import Chip from '@mui/joy/Chip';
import { useEffect } from 'react';
import colors from '../../colors';
import { ProjectStatus } from '../../types/project';

/**
 *  colorForStatus function
 * @description  returns color for status
 * @param status  string
 * @returns  string
 */

function colorForStatus(status: ProjectStatus) {
  switch (status) {
    case ProjectStatus.SELECT_OPTION:
      return 'Neutral';
    case ProjectStatus.NOT_STARTED:
      return colors.notStarted;
    case ProjectStatus.IN_PROCESS:
      return colors.darkPurple;
    case ProjectStatus.UNDER_REVISION:
      return colors.purple;
    case ProjectStatus.DELAYED:
      return colors.delayed;
    case ProjectStatus.POSTPONED:
      return colors.blue;
    case ProjectStatus.DONE:
      return colors.success;
    case ProjectStatus.CANCELLED:
      return colors.danger;
    case ProjectStatus.IN_QUOTATION:
      return colors.darkerBlue;
    case ProjectStatus.ACCEPTED:
      return colors.gold;
    default:
      return 'neutral';
  }
}

/**
 * ClickableChip component for Pprojects
 * @description Chip component with Select component
 * @returns JSX.Element
 */

export default function ClickableChip({
  value,
  setValue,
  handleChange,
}: {
  value: ProjectStatus;
  setValue: (newVal: ProjectStatus) => void;
  handleChange: (newVal: ProjectStatus) => void;
}) {
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <Chip
      component={Select}
      variant='solid'
      style={{ backgroundColor: colorForStatus(value) }}
      value={value}
      placeholder='Select an option'
      indicator={<KeyboardArrowDown />}
      onChange={(_, newVal) => {
        if (newVal !== null && typeof newVal !== 'string') {
          setValue(newVal as ProjectStatus);
        }
        handleChange(value);
      }}
      sx={{
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
      }}
    >
      <Option value={ProjectStatus.NOT_STARTED}>Not Started</Option>
      <Option value={ProjectStatus.IN_PROCESS}>In Process</Option>
      <Option value={ProjectStatus.UNDER_REVISION}>Under Revision</Option>
      <Option value={ProjectStatus.DELAYED}>Delayed</Option>
      <Option value={ProjectStatus.POSTPONED}>Postponed</Option>
      <Option value={ProjectStatus.DONE}>Done</Option>
      <Option value={ProjectStatus.CANCELLED}>Cancelled</Option>
      <Option value={ProjectStatus.IN_QUOTATION}>In Quotation</Option>
      <Option value={ProjectStatus.ACCEPTED}>Accepted</Option>
    </Chip>
  );
}
