/**
 * Presentation Layer Types
 * Định nghĩa các types cho Presentation layer
 */

export interface ToaNha {
  maViTri: number | null;
  toadoX: number;
  toadoY: number;
}

export interface ToaNhaFormProps {
  toaNha: ToaNha | null;
  onSubmit: (data: { toadoX: number; toadoY: number }) => void;
  onCancel?: () => void;
}

export interface ToaNhaListProps {
  toaNhaList: ToaNha[];
  onEdit: (toaNha: ToaNha) => void;
  onDelete: (maViTri: number) => void;
  loading: boolean;
}

