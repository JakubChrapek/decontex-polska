import { Link } from "gatsby";
import React from "react"
import { useForm } from "react-hook-form";
import styled from "styled-components";

const OrdersForm = ({ buttonText }) => {
    const { register, handleSubmit } = useForm();

    const Submit = (data) => {

    }

    return (
        <Wrapper onSubmit={handleSubmit((data) => Submit(data))}>
            <div className="grid">
                <label>
                    <span>Imię i nazwisko</span>
                    <input {...register("name")} placeholder="John Doe" />
                </label>
                <label>
                    <span>Email</span>
                    <input {...register("mail")} placeholder="john@gmail.com" />
                </label>
                <label>
                    <span>Numer telefonu</span>
                    <input {...register("phone")} placeholder="20 111 2345 6789" />
                </label>
                <label>
                    <span>Nazwa jednostki</span>
                    <input {...register("phone")} placeholder="Pisz tutaj" />
                </label>
                <label>
                    <span>Adres adbioru</span>
                    <input {...register("adress")} placeholder="101 Warszawiaków, Warszawa" />
                </label>
                <label>
                    <span>Kod pocztowy</span>
                    <input {...register("postCode")} placeholder="16-030" />
                </label>
            </div>
            <label>
                <span>Twoje zamówienie</span>
                <textarea {...register("message")} rows="6" placeholder="Pisz tutaj" />
            </label>
            <label className="checkbox">
                <input type='checkbox' />
                <span>Wysyłając wiadomość, akceptujesz <Link to="/rodo">Politykę prywatności</Link></span>
            </label>
            <button className="button" type="submit" >{buttonText}</button>
        </Wrapper>
    )
}

export default OrdersForm

const Wrapper = styled.form`
    width: 100%;
    display: grid;

    .grid{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 24px;
    }

    .button{
        padding: 14px 0;
        border-radius: 8px;
        background-color: var(--active);
        border: unset;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        font-family: "Poppins";
        color: var(--mainLightText);
        transition: .2s linear ;
        border: 1px solid var(--active);

        &:hover{
            border: 1px solid var(--active);
            background-color: transparent;

            color: var(--active);
        }
    }

    label{
        display: grid;
        margin-top: 24px;

        &.checkbox{
            display: flex;
            align-items: center;
            margin-bottom: 34px;

            input{
                margin-right: 8px;
                position: relative;
                appearance: none;
                background-color: transparent;
                border: 1px solid var(--divider);
                display: block;
                transition: 0.2s ease-out;
                padding: 0;
                width: 16px;
                height: 16px;
                border-radius: 4px;

                &::after {
                    content: '✓';
                    transition: 120ms transform ease-in-out;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translateX(-50%) translateY(-50%) scale(0);
                    border-radius: 3px;
                    color: #2c8cda;
                    font-weight: 900;
                    z-index: 3;
                }

                &:checked{
                    &::after{
                        transform: translateX(-50%) translateY(-50%) scale(0.8);
                    }
                }

                &:hover{
                    border: 1px solid var(--active);
                }
            }

            span{
                margin: 0;
                font-family: 'DM Sans';
                font-size: 14px;
                line-height: 180%;
                color: var(--subDarkText);
                position: relative;

                a{
                    color: var(--active);
                    transition: .2s linear;
                    border-bottom: 1px solid #fff;

                    &:hover{
                        border-bottom: 1px solid var(--active);
                    }
                }
            }
        }

        span{
            font-family: "Poppins";
            font-weight: 600;
            font-size: 12px;
            line-height: 180%;
            margin-bottom: 4px;
        }

        input, textarea{
            padding: 14px 16px;
            border-radius: 8px;
            border: 1px solid var(--divider);

            &::placeholder{
                font-size: 14px;
                line-height: 180%;
                color: var(--formDarkText);
            }

        }
    }

    @media (max-width: 660px) {
        .grid{
            grid-template-columns: 1fr;
        }
    }
    
`