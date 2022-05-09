export interface SearchInputProps {
  elementKey: string;
  inputName: string;
  placeholderText: string;
  placeholderTextColor: string;
}

export interface ListObject {
  [key: string]: any;
}

export interface SelectionOption<T> extends ListObject<T> {}
