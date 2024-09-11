// import Head from 'next/head';
import {
    Box,
    Divider,
    AbsoluteCenter,
} from '@chakra-ui/react';

// const brandPrimary = defineStyle({
//     borderWidth: '3px',
//     borderStyle: 'dashed',
//     borderColor: 'orange.500',

//     // let's also provide dark mode alternatives
//     _dark: {
//         borderColor: 'orange.300',
//     }
// })

// const thick = defineStyle({
//     borderWidth: '5px', // change the width of the border
//     borderStyle: "solid", // change the style of the border
//     borderRadius: 10, // set border radius to 10
// })

// export const dividerTheme = defineStyleConfig({
//     defaultProps: {
//         size: 'xl',
//         variant: 'thick',
//         colorScheme: 'brand',
//     },
//     variants: { brandPrimary, thick },

// })

// export const theme = extendTheme({
//     components: { Divider: dividerTheme },
// })

export const CustomDivider = (props: any) => {

    return (

        <Box position='relative' padding={props.padding}>
            <Divider margin={1} colorScheme={"red"} borderColor={"red"} size={"10"} variant={"dashed"} />
            <AbsoluteCenter bg='white' px='4'>
                {props.title}
            </AbsoluteCenter>
        </Box>

    );
}
