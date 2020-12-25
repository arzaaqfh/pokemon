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
    .active {
        background-color: #4CAF50;
    }`

export const Box = styled.div`
    border-radius: 25px;
    margin: 60px auto;
    width: 300px;
    border: 3px solid #73AD21;
    padding: 10px;
    box-shadow: 5px 3px #c2c2c2; 
`
export const BoxDetail = styled.div`
    border-radius: 25px;
    margin: 60px auto;
    width: 240px;
    background-color: #9deb31;
    border: 5px solid #464646;
    padding: 10px;
    box-shadow: 5px 3px #7e7e7e; 
`
