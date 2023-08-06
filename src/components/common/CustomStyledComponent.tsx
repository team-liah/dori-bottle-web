import tw from 'tailwind-styled-components';

export const Button = tw.button`
    h-[54px]
    w-full
    rounded-[15px]
    bg-main-blue
    text-[16px]
    font-medium
    text-white
    transition-colors
    disabled:bg-unactivated
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
    bg-main-blue
    text-[14px]
    font-medium
    text-white
`;
