import styled from 'styled-components';
import { BsBag } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { RootState } from '../votre-chemin-vers-votre-root-reducer'; // Importez le RootState pour le state Redux


const StyledNavbarCartLogo = styled.div`
    margin-right: 10px;
    position: relative;

    span.badge {
        position: absolute;
        bottom: 0;
        right: -5px;
        background-color: ${(props) => props.theme.colors.primary};
        line-height: calc(14 / 9);
        padding: 0 3px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: ${(props) => props.theme.fontWeight};
    }
`;



const Cart = () => {
    const cart = useSelector((state) => state.cart);

    return (
        <StyledNavbarCartLogo>
            <BsBag size="1.7rem" />
            <span className="badge">{cart.length}</span>
        </StyledNavbarCartLogo>
    );
};

export default Cart;
