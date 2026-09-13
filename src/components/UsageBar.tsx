import { Box, Flex, Text } from '@radix-ui/themes';
import { motion } from 'framer-motion'; // For smooth animations

interface UsageBarProps {
  value: number;
  label: string;
  compact?: boolean;
  avgValue?: number;
  placement?: "top" | "bottom" | "side";
}

const UsageBar = ({ value, label, compact = false, avgValue, placement = "side" }: UsageBarProps) => {
  // For display purposes, we show the actual value (can exceed 100%)
  const displayValue = Math.max(value, 0);
  // For progress bar width, cap at 100%
  const barWidth = Math.min(Math.max(value, 0), 100);

  // Determine color based on thresholds (aligned with Modern mode)
  const getColor = (val: number) => {
    if (val > 90) return 'red';
    if (val > 70) return 'orange';
    if (val > 50) return 'blue';
    return 'green';
  };

  const barColor = getColor(displayValue);

  const avgDisplay = avgValue !== undefined ? `Avg: ${avgValue.toFixed(1)}%` : null;

  if (compact) {
    return (
      <Box style={{ width: '100%' }}>
        <Box
          style={{
            width: '100%',
            height: '6px',
            backgroundColor: 'var(--gray-5)',
            borderRadius: '3px',
            overflow: 'hidden',
            marginBottom: '2px',
          }}
        >
          <motion.div
            style={{
              height: '100%',
              backgroundColor: `var(--${barColor}-9)`,
              borderRadius: '3px',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${barWidth}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </Box>
        <label color="gray" className='text-sm'>
          {displayValue.toFixed(1)}% {avgDisplay ? `(${avgDisplay})` : ''}
        </label>
      </Box>
    );
  }

  return (
    <Flex direction={placement === "side" ? "column" : placement === "top" ? "column-reverse" : "column"} gap="1" style={{ width: placement === "side" ? '100%' : 'auto' }}>
      <Flex justify="between" align="center">
        <Text size="2" color="gray">
          {label}
        </Text>
        <Text size="2" weight="medium">
          {displayValue.toFixed(1)}% {avgDisplay ? <span style={{ color: 'var(--gray-9)' }}>({avgDisplay})</span> : null}
        </Text>
      </Flex>
      <Box
        style={{
          width: '100%',
          height: '8px',
          backgroundColor: 'var(--gray-5)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{
            height: '100%',
            backgroundColor: `var(--${barColor}-9)`,
            borderRadius: '4px',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${barWidth}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </Box>
    </Flex>
  );
};

export default UsageBar;