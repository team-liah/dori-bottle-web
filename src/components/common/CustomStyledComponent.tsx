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
    opacity-60
`;
