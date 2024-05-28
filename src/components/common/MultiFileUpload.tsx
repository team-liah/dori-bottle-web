import { XIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ControllerRenderProps } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import { v4 as uuid } from 'uuid';

type FileWithPreview = File & { id: string; preview: string };
interface IMultiFileUploadProps {
  label?: React.ReactNode;
  readOnly?: boolean;
  error?: string;
  field: ControllerRenderProps<any, any>;
  maxCount?: number;
}

//#region Styled Component

const ErrorText = tw.span`
  font-Pretendard
  absolute
  bottom-[-30px]
  left-[5px]
  text-[12px]
  font-medium
  text-alert
`;

const Wrapper = tw.div`
  relative
  flex
  w-full
  flex-col
  gap-4
`;

const InputWrapper = tw.div`
  relative
  flex
  w-full
  flex-row
  gap-3
`;

const Thumb = tw.div`
  relative
`;

const ThumbInner = tw.div`
  aspect-square
  h-[55px]
  max-h-[55px]
  min-h-[55px]
  w-[55px]
  min-w-[55px]
  max-w-[55px]
  overflow-hidden
  rounded-[8px]
`;

const StyledImage = tw.img`
  h-[55px]
  max-h-[55px]
  min-h-[55px]
  w-[55px]
  min-w-[55px]
  max-w-[55px]
  object-cover
`;

const DeleteButton = tw(XIcon)`
  absolute
  top-[-2px]
  right-[-2px]
  cursor-pointer
  bg-gray1
  rounded-full
  p-[1px]
  text-white
  fill-current
  w-[12px]
  h-[12px]
`;

const AddButton = tw.div`
  bg-transparent
  flex
  aspect-square
  h-[55px]
  max-h-[55px]
  min-h-[55px]
  w-[55px]
  min-w-[55px]
  max-w-[55px]
  cursor-pointer
  items-center
  justify-center
  rounded-[8px]
  border-[1.5px]
  border-dashed
  border-unactivated
  text-[16px]
  font-medium
  text-unactivated
`;

//#endregion

const MultiFileUpload = ({
  label,
  field,
  error,
  readOnly,
  maxCount,
}: IMultiFileUploadProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    disabled: readOnly,
    maxFiles: maxCount,
    maxSize: 1024 * 1024 * 5, // 5MB
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      const newFiles = [
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: uuid(),
          }),
        ),
      ].slice(0, maxCount);

      setFiles(newFiles);
    },
  });

  const thumbs = files.map((file) => (
    <Thumb key={file.id}>
      <ThumbInner>
        <StyledImage
          alt={file.name}
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </ThumbInner>
      <DeleteButton
        onClick={() => {
          const newFiles = files.filter((f) => f.id !== file.id);
          setFiles(newFiles);
          field.onChange(newFiles);
        }}
      />
    </Thumb>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    field.onChange(files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <Wrapper>
      {label}
      <InputWrapper>
        {thumbs}
        {!maxCount ||
          (maxCount && files.length < maxCount && (
            <AddButton {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />+
            </AddButton>
          ))}
      </InputWrapper>
      <ErrorText>{error}</ErrorText>
    </Wrapper>
  );
};

export default MultiFileUpload;
