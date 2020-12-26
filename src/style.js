import styled from '@emotion/styled';

export const Navbar = styled.nav`
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333;
        position: fixed;
        top: 0;
        width: 100%;
    }
    li {
        float: left;
        width: 50%;
    }    
    li a {
        text-transform: uppercase;
        font-size: 12px;
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }    
    li a:hover:not(.active) {
        background-color: #73AD21;
    }    
    `

export const Box = styled.div`
    border-radius: 5px;
    margin: 60px auto;
    width: 300px;
    border: 3px solid #73AD21;
    padding: 10px;
    box-shadow: 5px 3px #c2c2c2;
`
export const BoxDetail = styled.div`
    border-radius: 5px;
    margin: 60px auto;
    width: 240px;
    background-color: #ffffff;
    padding: 10px;
    box-shadow: 5px 3px #7e7e7e;
    .labelBox{
        background-color: #4CAF50;
        color: white;
        text-align: center;
    }
    .labelVal{
        text-transform: capitalize;
        margin-bottom: 8px;
        padding-left: 8px;
    }
`

export const BoxImage = styled.div`
    margin: 5px auto;
    width: 150px;
    height: 150px;
    img{
        width: 100%;
        height: 100%;
    }
`
export const TableStyled = styled.table`
    table {
        border-collapse: collapse;
        background-color: #f1f1f1;
        width: 100%;
        margin: 5px 5px 5px 5px;
    }    
    th, td {
        text-align: left;
        padding: 8px;
        border-bottom: 1px solid #ddd;
    }    
    th {
        background-color: #4CAF50;
        color: white;
    }
    tr:hover {
        background-color: #f5f5f5;
    }
    tr {
        text-transform: capitalize;
    }
`
export const BtnDetail = styled.button`
    outline: none;
    background-color: #008CBA;        
    border: none;
    padding: 3px 3px 3px 3px;
    box-shadow: 0 12px 16px 0 #0000003d, 0 17px 50px 0 rgba(0,0,0,0.19);
    a {
        color: #ffffff;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        cursor: pointer;
    }
`
export const BtnRelease = styled.button`
    outline: none;
    background-color: #f44336;        
    border: none;
    padding: 3px 3px 3px 3px;
    margin: 1px;
    box-shadow: 0 12px 16px 0 #0000003d, 0 17px 50px 0 #00000030;
    a {
        color: #ffffff;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        cursor: pointer;
    }
`
export const BtnCatch = styled.button`
    outline: none;
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    box-shadow: 0 12px 16px 0 #0000003d, 0 17px 50px 0 #00000030;
`
export const BtnPrev = styled.button`
    outline: none;
    background-color: #e7e7e7;        
    border: none;
    padding: 5px 5px 5px 5px;
    box-shadow: 0 12px 16px 0 #0000003d, 0 17px 50px 0 #00000030;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
`
export const BtnNext = styled.button`
    outline: none;
    background-color: #e7e7e7;
    float: right;    
    border: none;
    padding: 5px 5px 5px 5px;
    box-shadow: 0 12px 16px 0 #0000003d, 0 17px 50px 0 #00000030;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
`
export const BtnNextPrevDisabled = styled.button`
    outline: none;
    background-color: #e7e7e7;        
    border: none;
    padding: 5px 5px 5px 5px;
    box-shadow: 0 12px 16px 0 #0000003d, 0 17px 50px 0 #00000030;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    opacity: 0.6;
    cursor: not-allowed;
`
export const InputBox = styled.div`
    input[type=text], select {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }    
    input[type=submit] {
        outline: none;
        width: 100%;
        background-color: #4CAF50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        box-shadow: 0 12px 16px 0 #0000003d, 0 17px 50px 0 #00000030;
    }    
    input[type=submit]:hover {
        background-color: #45a049;
    }
`
export const BtnGroup = styled.div`
    width: 35%;
    height: 30px;
    padding: 2px 2px 2px 2px;
`
export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    padding: 8px;
    > div {
        background-color: rgba(255, 255, 255, 0.8);
        text-align: center;
        font-size: 12px;
        border: 1px solid #111;
    }
`