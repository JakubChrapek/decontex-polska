import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Yes from '../vectors/yes.svg';
import handler from '../../api/kontaktForm';
import { motion } from 'framer-motion';

const KontaktForm = ({ buttonText }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const [isSended, changeIsSended] = useState(false);
  const [sendedCount, changeSendedCount] = useState(0);

  const Submit = (data) => {
    handler(data).then((res) => {
      if (res.status === 200) {
        changeIsSended('success');
        changeSendedCount(sendedCount + 1);
        reset();
      } else {
        changeIsSended('error');
        changeSendedCount(sendedCount + 1);
      }
    });
  };

  return (
    <Wrapper yes={Yes} onSubmit={handleSubmit((data) => Submit(data))}>
      <label className={errors.name && 'error'}>
        <span>Imię i nazwisko*</span>
        <input
          {...register('name', { required: true, pattern: /^[a-z ,.'-]+$/i })}
          placeholder="Jan Nowak"
        />
        {errors.name && (
          <motion.p
            initial={{ opacity: 0, bottom: -6 }}
            animate={{ opacity: 1, bottom: 0 }}
            exit={{ opacity: 1, bottom: -6 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="errorText"
          >
            Podaj imię i nazwisko
          </motion.p>
        )}
      </label>
      <label className={errors.phone && 'error'}>
        <span>Numer telefonu</span>
        <input
          {...register('phone', {
            pattern: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
          })}
          placeholder="np. 505 505 505"
        />
        {errors.phone && (
          <motion.p
            initial={{ opacity: 0, bottom: -6 }}
            animate={{ opacity: 1, bottom: 0 }}
            exit={{ opacity: 1, bottom: -6 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="errorText"
          >
            Wpisz poprawny nr telefonu
          </motion.p>
        )}
      </label>
      <label className={errors.mail && 'error'}>
        <span>Email*</span>
        <input
          {...register('mail', {
            required: true,
            pattern:
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          placeholder="jan@gmail.com"
        />
        {errors.mail?.type === 'required' && (
          <motion.p
            initial={{ opacity: 0, bottom: -6 }}
            animate={{ opacity: 1, bottom: 0 }}
            exit={{ opacity: 1, bottom: -6 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="errorText"
          >
            Podaj adres e-mail
          </motion.p>
        )}
        {errors.mail?.type === 'pattern' && (
          <motion.p
            initial={{ opacity: 0, bottom: -6 }}
            animate={{ opacity: 1, bottom: 0 }}
            exit={{ opacity: 1, bottom: -6 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="errorText"
          >
            Podaj poprawny adres e-mail
          </motion.p>
        )}
      </label>
      <label className={errors.message && 'error'}>
        <span>Jak możemy pomóc?*</span>
        <textarea
          {...register('message', { required: true })}
          rows="6"
          placeholder="Jak możemy Ci pomóc?"
        />
        {errors.message && (
          <motion.p
            initial={{ opacity: 0, bottom: -6 }}
            animate={{ opacity: 1, bottom: 0 }}
            exit={{ opacity: 1, bottom: -6 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="errorText"
          >
            Wpisz wiadomość
          </motion.p>
        )}
      </label>
      <label className={(errors.check && 'error') + ' checkbox'}>
        <input type="checkbox" {...register('check', { required: true })} />
        <span>
          Wysyłając wiadomość, akceptujesz{' '}
          <Link to="/rodo">Politykę prywatności</Link>*
        </span>
        {errors.check && (
          <motion.p
            initial={{ opacity: 0, bottom: -6 }}
            animate={{ opacity: 1, bottom: 0 }}
            exit={{ opacity: 1, bottom: -6 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="errorText"
          >
            Zaakceptuj politykę prywatności
          </motion.p>
        )}
      </label>
      <div className="buttonWrapper">
        <button disabled={sendedCount === 3} type="submit">
          {buttonText}
        </button>
        {isSended && (
          <motion.p
            initial={{ opacity: 0, bottom: -6 }}
            animate={{ opacity: 1, bottom: 0 }}
            exit={{ opacity: 1, bottom: -6 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className={isSended === 'error' ? 'errorText' : 'successText'}
          >
            {isSended !== 'error'
              ? sendedCount !== 3
                ? 'Wiadomość pomyślnie wysłana.'
                : 'Wiadomość pomyślnie wysłana. Wysłano za dużo wiadomości, wkrótce się odezwiemy.'
              : sendedCount !== 3
              ? 'Coś poszło nie tak, spróbuj jeszcze raz.'
              : 'Za dużo prób wysłania, spróbuj póżniej'}
          </motion.p>
        )}
      </div>
    </Wrapper>
  );
};

export default KontaktForm;

const Wrapper = styled.form`
  width: 100%;
  display: grid;

  .buttonWrapper {
    position: relative;

    .errorText {
      color: var(--error);
      margin-bottom: -10px;
      font-size: 12px;
      position: absolute;
    }

    .successText {
      margin-bottom: -10px;
      font-size: 12px;
      position: absolute;
    }

    button {
      padding: 14px 0;
      border-radius: 8px;
      background-color: var(--active);
      border: unset;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      font-family: 'Poppins';
      color: var(--mainDarkText);
      transition: color 0.2s linear, background-color 0.2s linear,
        border 0.2s linear;
      border: 1px solid var(--active);
      margin-bottom: 12px;
      width: 100%;

      &:hover {
        border: 1px solid var(--backgroundLight);
        background-color: var(--backgroundLight);
        color: var(--mainLightText);
      }

      &:disabled {
        filter: grayscale(1);
        cursor: unset;
        &:hover {
          border: 1px solid var(--active);
          background-color: var(--active);
        }
      }
    }
  }

  label {
    display: grid;
    margin-top: 24px;
    position: relative;

    .errorText {
      color: red;
      position: absolute;
      bottom: 0;
      transform: translateY(100%);
      margin-bottom: -3px !important;
      font-size: 11px;
    }

    &.checkbox {
      display: grid;
      grid-template-columns: 16px 1fr;
      grid-column-gap: 8px;
      align-items: center;
      margin-bottom: 34px;

      input {
        margin-right: 8px;
        position: relative;
        appearance: none;
        background-color: transparent;
        border: 1px solid var(--divider);
        display: block;
        transition: border 0.2s ease-out;
        padding: 0;
        width: 16px;
        height: 16px;
        border-radius: 4px;

        &::after {
          content: url(${(props) => props.yes});
          transition: 120ms transform ease-in-out;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%) scale(0);
          border-radius: 3px;
          font-weight: 900;
          z-index: 3;
        }

        &:checked {
          &::after {
            transform: translateX(-50%) translateY(-50%) scale(0.8);
          }
        }

        &:hover {
          border: 1px solid var(--active);
        }
      }

      span {
        margin: 0;
        font-family: 'DM Sans';
        font-size: 14px;
        line-height: 180%;
        color: var(--subDarkText);

        a {
          color: var(--active);
          transition: color 0.2s linear, border 0.2s linear;
          border-bottom: 1px solid #fff;

          &:hover {
            border-bottom: 1px solid var(--backgroundLight);
            color: var(--backgroundLight);
          }
        }
      }
    }

    span {
      font-family: 'Poppins';
      font-weight: 600;
      font-size: 12px;
      line-height: 180%;
      margin-bottom: 4px;
    }

    input,
    textarea {
      padding: 14px 16px;
      border-radius: 8px;
      border: 1px solid var(--divider);
      transition: border 0.2s linear;

      &:active {
        border-color: var(--formDarkText) !important;
      }

      &::placeholder {
        font-size: 14px;
        line-height: 180%;
        color: var(--formDarkText);
      }
    }

    &.error {
      input,
      textarea {
        border-color: var(--error);
      }
    }

    &:hover {
      input,
      textarea {
        border-color: var(--formDarkText);
      }
    }
  }
`;
