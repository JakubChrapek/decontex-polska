import React from "react"
import { useForm } from "react-hook-form";
import styled from "styled-components";

const KontaktForm = ({buttonText}) => {
    const { register, handleSubmit } = useForm();

    const Submit = (data) => {

    }

    return (
        <Wrapper onSubmit={handleSubmit((data) => Submit(data))}>
            <label>
                <span>Imię i nazwisko</span>
                <input {...register("name")} placeholder="John Doe" />
            </label>
            <label>
                <span>Numer telefonu</span>
                <input {...register("phone")} placeholder="20 111 2345 6789" />
            </label>
            <label>
                <span>Email</span>
                <input {...register("mail")} placeholder="john@gmail.com" />
            </label>
            <label>
                <span>Jak możemy pomóc?</span>
                <textarea {...register("message")} rows="6" placeholder="Pisz tutaj" />
            </label>
            <label className="checkbox">
                <input type='checkbox' />
                <span>Wysyłając wiadomość, akceptujesz <a href="#">Politykę prywatności</a></span>
            </label>
            <button className="button" type="submit" >{buttonText }</button>

        </Wrapper>
    )
}

export default KontaktForm

const Wrapper = styled.form`
    width: 100%;
    display: grid;

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
            }

            span{
                margin: 0;
                font-family: 'DM Sans';
                font-size: 14px;
                line-height: 180%;
                color: var(--subDarkText);

                a{
                    color: var(--active);
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
`