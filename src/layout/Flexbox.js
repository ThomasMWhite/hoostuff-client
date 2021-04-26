import styled from 'styled-components'

export const Grid = styled.div`
width: 100%;
`;

export const Row = styled.div`
    display: flex;
    width: 100%;
`;

const media = {
    xs: (styles) =>`
        @media only screen and (max-width: 550px){
            ${styles}
        }
    `,
    md:(styles)=>`
    @media only screen and (max-width: 800px){
        ${styles}
    }
    `,
    sd:(styles)=>`
    @media only screen and (max-width: 680px){
        ${styles}
    }
    `,
    dd:(styles)=>`
    @media only screen and (min-width: 680px){
        ${styles}
    }
    `,
    ls:(styles)=>`
    @media only screen and (min-width: 1250px){
        ${styles}
    }
    `,
    ld:(styles)=>`
    @media only screen and (max-width: 1250px){
        ${styles}
    }
    `,
    td:(styles)=>`
    @media only screen and (max-width: 1350px){
        ${styles}
    }
    `,
    max:(styles)=>`
    @media only screen and (max-width: 800px){
        max-width: 70px,
        ${styles}
    }`
}

export const Col = styled.div`
    flex: ${(props)=> props.size};
    ${(props)=> props.collapse && media[props.collapse](`
        display: none;
    `)};
`;