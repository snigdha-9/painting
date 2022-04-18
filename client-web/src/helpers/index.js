export * from './errors';

export const formatFile = file => ({
  file,
  name: file.name,
  preview: URL.createObjectURL(file),
  type: file.type,
  progress: 0,
  uploaded: false,
  error: false,
  url: null,
  selected: false
});
