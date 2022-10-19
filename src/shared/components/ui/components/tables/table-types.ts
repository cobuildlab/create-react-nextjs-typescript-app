
export type TableColumnType<T> = {
  id: string;
  label: string;
  value: ((item: T) => string | number) | null;
  component?: (item: T) => React.ReactElement;
  format?: (value: string | number) => string;
  config?: {
    style?: {
      align?: 'right' | 'left' | 'center' | 'justify' | 'inherit',
      minWidth?: number,
      sticky?: boolean
    }
  }
}
