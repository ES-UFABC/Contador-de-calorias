import styled from 'styled-components';

export const List = styled.ul`
    list-style: none;
    margin-top: 20px;

    li{
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        & + li{
            border-top: 2px solid #EEE;
        }

        a{
            color: #0D2636;
            text-decoration: none;
        }
    }
`;

export const Button = styled.button.attrs({
    type: 'button'
})`
    background: transparent;
    color: #0D2636;
    border:0;
    padding: 8px 7px;
    outline: 0;
    border-radius: 4px;
`
;