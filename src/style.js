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
    border: 3px solid #464646;
    padding: 10px;
    box-shadow: 5px 3px #7e7e7e;
`
export const BoxImage = styled.div`
    margin: 5px auto;
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
    background-color: #008CBA;        
    border: none;
    padding: 3px 3px 3px 3px;
    a {
        color: #ffffff;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        cursor: pointer;
    }
`
export const BtnRelease = styled.button`
    background-color: #f44336;        
    border: none;
    padding: 3px 3px 3px 3px;
    margin: 1px;
    a {
        color: #ffffff;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        cursor: pointer;
    }
`