import tw from 'tailwind-styled-components';

export const Button = tw.button<{ $style?: 'primary' | 'default' | 'disable' }>`
    flex
    h-[54px]
    min-h-[54px]
    w-full
    items-center
    justify-center
    rounded-[15px]
    text-[16px]
    font-medium
    transition-colors
    disabled:bg-unactivated
    ${(props) => {
      switch (props.$style) {
        case 'default':
          return 'border border-main-blue bg-white text-main-blue rounded-[8px]';
        case 'disable':
          return 'bg-unactivated text-white';
        default:
          return 'bg-main-blue text-white';
      }
    }}
`;

export const MobileWrapper = tw.div`
    relative
    h-screen
    w-screen
    bg-white
    px-[20px]
    pb-[108px]
`;

export const Dimmed = tw.div`
    absolute
    top-0
    left-0
    h-screen
    w-screen
    bg-black
    opacity-10
`;

export const ProgressBar = tw.div`
    h-[2px]
    w-full
    animate-pulse
    bg-main-blue
`;

export const Divider = tw.div`
    h-[1px]
    min-h-[1px]
    w-full
    bg-back-line
`;

export const Empty = tw.div`
    h-full
    flex
    w-full
    items-center
    justify-center
    pt-10
    text-[14px]
    text-gray2
`;

export const TabWrapper = tw.div`
    flex
    flex-col
    overflow-y-auto
    px-5
    pt-8
    pb-[76px]
`;

export const GuideNumber = tw.div`
    flex
    h-[21px]
    w-[21px]
    items-center
    justify-center
    rounded-full
    bg-white
    text-[14px]
    font-medium
    text-gray2
    shadow-[0_0_5px_0px_rgba(17,17,17,0.15)]
`;

export const Skeleton = tw.div`
    h-[12px]
    animate-pulse
    rounded-full
    bg-gray-light
    opacity-30
    dark:bg-gray
`;
